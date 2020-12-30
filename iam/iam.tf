# user 생성
resource "aws_iam_user" "gildong_hong" {
    name = "gildong.hong"
}

# 그룹 생성
resource "aws_iam_group" "devops_group" {
    name = "devops"
}

# 그룹에 유저 할당
resource "aws_iam_group_membership" "devops" {
    name = aws_iam_group.devops_group.name

    users = [
        aws_iam_user.gildong_hong.name
    ]

    group = aws_iam_group.devops_group.name
}



# gildong.hong
# 2%!DM4CIZ6E{q#p
# https://348105057391.signin.aws.amazon.com/console