resource "aws_subnet" "public_subnet" {
    vpc_id = aws_vpc.main.id
    cidr_block = "10.0.0.0/24"

    availability_zone = "ap-northeast-2a" 
    # availabilty_zone 을 명시하면 해당 존에 생성, 
    # 그렇지 않으면 아무곳에 생성

     tags = {
        Name = "terraform-101-public-subnet"
    }
}

resource "aws_subnet" "private_subnet" {
    vpc_id = aws_vpc.main.id
    cidr_block = "10.0.1.0/24"    

     tags = {
        Name = "terraform-101-private-subnet"
    }
}