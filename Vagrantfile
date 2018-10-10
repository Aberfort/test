# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

$homedir = "/home/landings/"
$playbook_path = "/tmp/provisioning"
$host_ip = "192.168.13.15"
$port_ssh = 2225
$port_http = 8185
$port_https = 8445

$gitlab_key = <<FILE
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAopUmoGb0xIRohYAILl3MTZSczEaprWdBvPuZ/59NCeBeJ8TK
8NAKQOrlf3SNc5gVUpXv3HJPnMJvoGaiZLp9cNNNzTt+wVO3vD8yHAQpTHq7Boo2
kxy6LGoib7lX+CqiRZqJ3xgzLg+7fC6hVmQZsU8RUQFt14nH/fIbzCtJ7dxof8+z
CvCztlvWWqJvGW/yYhcYKbSVeXlEbes8bl1Gt8gX66jIiGuq4raRxGclSUD8cgL4
NbyEnEehRD6iL4G6jCQ3ewr9gcM/o2kSv5sTUSWynXyFhoUX+wNmWJhZ+uxtU44+
mV+2ENmMnouso2W/uK9GNTArUZ9PdFbSgBM4rwIDAQABAoIBACavarN8C/2+q8go
QMoXk4daNzz8C1+xVBkNnQUP+JrDAmRgFRHbzrTHr7f2GbpJk7lE6AACSyM3uKvn
//gLz9FK1hZhc7W4n91xBBFahCEoitvxgy7aBQqQboU7Cs2IB3icXvXwoizxnWDd
D5Ko2twvviUSO/qvVCD+vNKF8l9gU3iDJp2cAn+mtsnHJC3K8hbmiofFtE18ADyp
JEAXiqxXU4WzZM/RTUifCtKCvL3aWYdo3qhKBFJ+cNsIJjwqx4oGxHDHY2EyMz+8
tLXQr3CMjuMFVWkhBYmWI3PTtgtHKamGRHLODAjhpC7bx+0Eyaae8xKLVOFPyfjN
xz7sn6ECgYEA0Jsb/eMXQRwccbrcdiMOglgJzExaEl9EuFQuvlDLUfP2QpdFOdG2
Inz9BMfmnqx4XVXRqWILat4G+6HEYLQq5sQiXWygDOBd3sAXBHTVwlMRhx7LlT8H
D5XKYvtTiac3X/TLqDnUvT5mmlzr/QNlx/J5K8czTsY02FxqUViDVRkCgYEAx4U+
7zmaE/M9BZjQWTa/eUSVRImodO6IPlc+M5BkG8XKJxE65tFmjQ+ZHud2lvQifvhu
Ryhj5lnWFND8UeSmtxJm7/amO+hBv0jGksPm8yKW2uV89OaxcET8Ytf64CtNeyck
VQSFcTS5UrY/aAkesE5kstEJ59yJHDwC9ikKrQcCgYAuG/rl9YowVBxdbyZH3pvY
Z8lSpRXLtc8kx0bFvmoSpVAri/A7RYVyvhnXMrBhJlI8nzmGrStE5eq5OBqGHYzW
EUhfSiFed0GIeQEddQ3CtEXNjhsF1DalVUC0/ESMyq9MwHk7p/zED8TyHdPzywp2
Vbw+1vsaUGlh4ZuGe4AcEQKBgGIXJCXAj/uW7j0+L9Bslh4slaYod2VlkB32DmKT
bmQpDYW/dtHbySs4q/MBoM/+HqeFw9HADb1GFXYOeL5aR4xhw7Hd9UQmn4xHXzjw
jy6hpsDfaluMv1eO0vZVcMWdBG6zg604l9JcNXBwoSOouCm9oMw48UHIrq/u4RXc
f58pAoGARy/degL4ImONp8Fqs0DlreBn6jwutJ6s/7FUjcVeMIrVBk9qAlsjOscg
ss47JJoaOl8lVStWIkX6RfUyIm6hf64S1ZbmH8t0Uhfmjj00PCeidAvqGrk4FlgN
/o8XidRPvEkov0JVF+HU7VRHG4wWEwRG5r0yWOd+OMbheVQDvhg=
-----END RSA PRIVATE KEY-----
FILE

Vagrant.require_version ">= 2.0.0"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.hostname = "isoft-landings"
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_check_update = true

  # Auto assign IP address and handle it via hosts file
  config.vm.network "private_network", ip: $host_ip
  config.vm.network "forwarded_port", guest: 80, host: $port_http
  config.vm.network "forwarded_port", guest: 443, host: $port_https
  config.vm.network "forwarded_port", guest: 22, host: $port_ssh, id: "ssh"
  config.ssh.guest_port = $port_ssh
  config.ssh.forward_agent = true

  # Config for plugin Hostsupdater
  # https://github.com/cogitatio/vagrant-hostsupdater
  config.hostsupdater.aliases = [
  	"www.nodejs-couk.isdev.info", "www.nodejs-net.isdev.info", "www.nodejs-no.isdev.info",
  	"nodejs-couk.isdev.info", "nodejs-net.isdev.info", "nodejs-no.isdev.info"
  ]

  config.vm.provider :virtualbox do |vb|
    vb.cpus = 1
    vb.memory = 512
    vb.name = "IS-Landings"
    vb.gui = false
    vb.customize ["modifyvm", :id, "--description", "VM for Intellectsoft Landings"]
  end

  # Shared folder from the host machine to the guest machine.
  config.vm.synced_folder ".", "#{$homedir}", id: "vagrant", :nfs => true, :mount_options => ['rw', 'vers=3', 'tcp', 'fsc', 'actimeo=2']

  # Command in user's home folder.
  config.vm.provision "shell", privileged: false, inline: <<SCRIPT
  	sudo apt-get -y install git
  	echo '#{$gitlab_key}' > ~/.ssh/id_rsa
  	sudo chown 600 ~/.ssh/id_rsa
	ssh-keyscan -H gitlab.isdev.info >> ~/.ssh/known_hosts
	sudo rm -rf #{$playbook_path}
	git clone git@gitlab.isdev.info:isoft/ansible-is-corp.git #{$playbook_path}
SCRIPT

  # Ansible provisioner.
  config.vm.provision "ansible_local" do |ansible|
    ansible.compatibility_mode = "2.0"
    ansible.playbook = "nodejs.yml"
    ansible.inventory_path = "inventories/vagrant/hosts"
    ansible.config_file = "ansible.cfg"
    ansible.provisioning_path = "#{$playbook_path}"
    ansible.become = true
    ansible.limit = "nodejs"
    ansible.extra_vars = {
      build_server: "true",
      build_landings: "true",
      build_shortener: "false",
      git_shortener_branch: "master",
      build_proxy: "true",
      fetch_from_s3: "true",
      user_uid: Etc.getpwuid(Process.uid).uid,
    }
    ansible.host_vars = {
      PROFILE_TASKS_TASK_OUTPUT_LIMIT: '15',
    }
  end
end