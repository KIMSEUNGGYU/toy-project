terraform {
    backend "s3" { # 강의는 
      bucket         = "tf101-gyu-apne2-tfstate" # s3 bucket 이름
      key            = "terraform/s3/terraform.tfstate"
      region         = "ap-northeast-2"  
      encrypt        = true
      dynamodb_table = "terraform-lock"
    }
}