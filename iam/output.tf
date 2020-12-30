# 출력을 위한 tf
output "tf101_image_id" {
    value = var.image_id
}

output "tf101_availability_zone_names" {
    value = var.availability_zone_names
}

output "tf101_ami_id_maps" {
    value = var.ami_id_maps
}

output "tf101_first_availaility_zone_names" {
    value = var.availability_zone_names[0]
}