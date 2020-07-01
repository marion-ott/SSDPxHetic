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
resource "aws_docdb_cluster" "docdb" {
  cluster_identifier      = "${var.stage}-docdb"
  engine                  = "docdb"
  master_username         = "foo"
  master_password         = "mustbeeightchars"
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.docdb.id]
}

resource "aws_security_group" "docdb" {
  name        = "${var.stage}-docdb"
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