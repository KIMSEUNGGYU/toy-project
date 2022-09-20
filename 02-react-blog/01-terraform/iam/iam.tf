# user 생성
resource "aws_iam_user" "gildong_hong" {
    name = "gildong.hong"
}

# policy 추가
resource "aws_iam_user_policy" "art_devops" {
    name = "super-admin"
    user = aws_iam_user.gildong_hong.name

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

# 그룹 생성
resource "aws_iam_group" "devops_group" {
    name = "devops"
}

# 그룹에 권한 추가
resource "aws_iam_group_policy" "devops_admin" {
  name  = "devops_admin_group"
  group = aws_iam_group.devops_group.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

# 그룹에 유저 할당
resource "aws_iam_group_membership" "devops" {
    name = aws_iam_group.devops_group.name

    # users = [
    #     aws_iam_user.gildong_hong.name
    # ]
    users = var.iam_user_list

    group = aws_iam_group.devops_group.name
}



# gildong.hong
# 2%!DM4CIZ6E{q#p
# https://348105057391.signin.aws.amazon.com/console