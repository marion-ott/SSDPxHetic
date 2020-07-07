resource "aws_instance" "application" {
  ami             = var.instance_ami
  instance_type   = var.instance_type
  count           = var.instance_count
  key_name        = var.instance_key_name
  security_groups = [aws_security_group.application.name]

  tags = {
    Name      = "${var.stage}-application"
    component = "application"
    stage     = var.stage
  }
}

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

# Security groups
resource "aws_security_group" "application" {
  name        = "${var.stage}-application"
  description = "Allow inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP web app"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.stage}-application"
  }
}

# DocumentDB instance
data "aws_subnet_ids" "subnet_ids" {
  vpc_id = aws_default_vpc.default.id
}

resource "aws_docdb_subnet_group" "documentdb_subnet" {
  name       = "${var.stage}-documentdb_subnet"
  subnet_ids = data.aws_subnet_ids.subnet_ids.ids

  tags = {
    Name = "Documentdb subnet group"
  }
}

resource "aws_docdb_cluster_parameter_group" "documentdb_paramgp" {
  family      = "docdb3.6"
  name        = "${var.stage}-documentdb-paramgp"
  description = "docdb cluster parameter group"

  parameter {
    name  = "tls"
    value = "disabled"
  }
}

resource "aws_docdb_cluster" "documentdb" {
  cluster_identifier               = "${var.stage}-documentdb"
  engine                          = "docdb"
  master_username                 = var.db_user
  master_password                 = var.db_password
  skip_final_snapshot              = true
  db_subnet_group_name            = aws_docdb_subnet_group.documentdb_subnet.name
  db_cluster_parameter_group_name = aws_docdb_cluster_parameter_group.documentdb_paramgp.name
  vpc_security_group_ids          = [aws_security_group.documentdb.id]
}

resource "aws_docdb_cluster_instance" "cluster_instances" {
  count             = var.db_instance
  identifier         = "${var.stage}-documentdb-instance-${count.index}"
  cluster_identifier = aws_docdb_cluster.documentdb.id
  instance_class    = "db.t3.medium"
}

resource "aws_security_group" "documentdb" {
  name        = "${var.stage}-documentdb"
  description = "Allow inbound traffic"

  ingress {
    description = "DocumentDB for web apps"
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    security_groups = [aws_security_group.application.id]
  }

  egress {
    description = "DocumentDB for web apps"
    from_port       = 27017
    to_port         = 27017
    protocol        = "tcp"
    security_groups = [aws_security_group.application.id]
  }

  tags = {
    Name = "${var.stage}-application"
  }
}

# Load balancer
resource "aws_elb" "elb" {
  name               = "${var.stage}-elb"
  availability_zones = ["eu-west-2c"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  listener {
    instance_port     = 9000
    instance_protocol = "http"
    lb_port           = 9000
    lb_protocol       = "http"
  }

  listener {
    instance_port     = 4466
    instance_protocol = "http"
    lb_port           = 4466
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:9000/"
    interval            = 30
  }

  instances                   = aws_instance.application.*.id
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  tags = {
    Name = "${var.stage}-elb"
  }
}