# role 생성
resource "aws_iam_role" "hello" {
    name = "hello-iam-role"
    path = "/"
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

}

# 퍼미션 추가
resource "aws_iam_role_policy" "hello_s3" {
  name = "hello-s3-download"
  role = aws_iam_role.hello.id
  policy = <<EOF
{
  "Statement": [
    {
      "Sid": "AllowAppArtifactsAll",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF

}

# aws_iam_instance_profile 란?
# 콘솔을 이용했을때는 자동으로 생성해줌,
# 테라폼의 경우 분활되어 있기 때문에 ec2에다가 iam_role 을 할당할때도 해당 resource 가 필요
resource "aws_iam_instance_profile" "hello" {
  name = "hello-profile"
  role = aws_iam_role.hello.name
}