resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"

    tags = {
        Name = "terraform-101"
    }
}

#### subnet ####
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


#### internet gateway ####
resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "terraform-101-igw"
    }
}

#### NAT gateway ####
# aws_eip ? 는 뭐지? - elastic ip address
resource "aws_eip" "nat" {
    vpc = true

    lifecycle {
        create_before_destroy = true
    }
}

resource "aws_nat_gateway" "nat_gateway" {
    allocation_id = aws_eip.nat.id

    subnet_id = aws_subnet.public_subnet.id     # public subnet 에 nat gateway 생성

    tags = {
        Name = "terraform-NATGW"
    }
}

#### routing table ####
resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "terraform-101-rf-public"
    }
}
# aws_route_table_association 는 
# 어느 subnet 을 어느 라우트테이블에 연결하는 것을 정의
resource "aws_route_table_association" "route_table_association_public" {
    subnet_id = aws_subnet.public_subnet.id
    route_table_id = aws_route_table.public.id
}

resource "aws_route_table" "private" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "terraform-101-rf-private"
    }
}

resource "aws_route_table_association" "route_table_association_private" {
    subnet_id = aws_subnet.private_subnet.id
    route_table_id = aws_route_table.private.id
}