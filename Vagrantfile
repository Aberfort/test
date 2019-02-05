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
  config.vm.synced_folder "~/.ssh/" , "/tmp/.ssh", :mount_options => ['ro']

  # Command in user's home folder.
  config.vm.provision "shell", privileged: false, inline: <<SCRIPT
  sudo apt-get -y install git
  echo -e "Host gitlab.isdev.info\n  IdentityFile /tmp/.ssh/id_rsa" >> ~/.ssh/config
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
  # Remove ansible git repo
  config.vm.provision "shell", privileged: false, inline: <<SCRIPT
  sudo rm -rf #{$playbook_path}
SCRIPT
end