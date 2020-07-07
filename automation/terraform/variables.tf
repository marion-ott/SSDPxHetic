variable "ssh_public_key_file" {
  type        = string
  description = "Path to public SSH key"
}

variable "db_user" {
  type = string
  default = "root"
  description = "Username to use for database connection"
}

variable "db_password" {
  type = string
  default = "thisisnotarealpassword"
  description = "Password to use for database connection"
}

variable "staging_instance_type" {
  type = string
  description = "Instance type for staging"
  default = "t2.micro"
}