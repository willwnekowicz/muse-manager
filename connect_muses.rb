require 'net/http'

# host = "10.0.0.2"
host = "localhost"
pub_ip = "127.0.0.1"
sub_ip = "127.0.0.1"
# sub_ip = "10.0.0.220"


21.times do |muse_id|
  muse_id = muse_id + 1
  muse_port = 5000 + muse_id

  url = URI.parse("http://#{host}:8080/link?pub_metric=batt&sub_metric=battery-muse#{muse_id}&publisher=muse-#{muse_port}&subscriber=muse-manager&pub_ip=#{pub_ip}&sub_ip=#{sub_ip}")
  Net::HTTP.get(url)

  url = URI.parse("http://#{host}:8080/link?pub_metric=touching_forehead&sub_metric=touching-muse#{muse_id}&publisher=muse-#{muse_port}&subscriber=muse-manager&pub_ip=#{pub_ip}&sub_ip=#{sub_ip}")
  Net::HTTP.get(url)

  url = URI.parse("http://#{host}:8080/link?pub_metric=horseshoe&sub_metric=horseshoe-muse#{muse_id}&publisher=muse-#{muse_port}&subscriber=muse-manager&pub_ip=#{pub_ip}&sub_ip=#{sub_ip}")
  Net::HTTP.get(url)

end
