# user 생성
resource "aws_iam_user" "seunggyu_kim" {
    name = "seunggyu.kim"
}

# policy 추가
resource "aws_iam_user_policy" "art_devops_for_seunggyu" {
    name = "super-admin"
    user = aws_iam_user.seunggyu_kim.name

    policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "*"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}

EOF
}