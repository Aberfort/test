# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

$homedir = "/home/landings/"
$playbook_path = "/tmp/provisioning"
$host_ip = "192.168.13.15"
$post_ssh = 2225
$http_ssh = 8185

$gitlab_key = <<FILE
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1/2Yhzr1RmfvgzxDVYJg9xaqASrybXIEgB8OOE6MpztYwzvv
DHMrEiMik8wNZxwea0y0HYCRTRNIqWnMT2tBBL4fGA75oVFsXB3oNfnjBEMOxjO6
AK/DVVvLRQu0nyY05tMTJidY2irwx9Cv8RSpEixSKf8lxN8Iv1chUNDpW3yk8GH1
XSuHMfbdZ8LQrZbl0vnSqHZKS7Yg09T2x7Onlfln6fLFIZXv+PxVaRO92Fmfmc8b
KOeBRrB54hclqWs6GNUr6fAvbfMnmlCwa4MNIaoSGuqIKMJA/RmRDg/61KBr5ZZs
ZcHsgEmkp2tvxmTRlP7Mobg4hPQXkjO6qqou1wIDAQABAoIBAQCn5ymlJj35Z16X
hEdLt7itG984XSxrzBCXkIy7VMSeU9IiovqnkPfQd6OvhRZ+KyuyecQikwlhAzaf
C/GZY2T9zNXbG/kOYH999HnJS+IgNAjOJvPXCMsuFdekav8UIN1K+paOOFQn9O2M
RzweitMLn4yXvRKdQkxIgfESI/Tj+kmVzFwmEeHm/dx7xzCPHuSHN2jy3sg3K/jC
lHor8ZYJRuCWy0687ZGPv45T67xrtmp9nW9VVoqRiBg2xxqv78IPS7k6xOpeyRNB
G/5opDaNZcfOYG8tvS2x5GARypAkNyB3jowE0TmQFl7sE+ttqr3AeqmBqi8DHTT7
FqALRyvhAoGBAO5NWLBf9Je1RT4YA0hM7ht9xNol7t4bPmaxVYi+5y1iZpcXtZ2h
fkBZjd3/FI3H08Wiukz6Fy6wRKnebh7eihZGlpAMqpktnXFWInYApIxj+V6HrdxR
kTRoMeMioLPzb6KtlvnguiA437LnS0/rY3sMINSlUD/1lVGFOaWYRTZfAoGBAOgI
DsHJPJBFNbM+AHP+sjLkGJli9rgleOIXGFMWrcZvcioV8f5nwqGydde5dfH4IK2y
BN8iEjhRH8GrNHDafBGLmu8qRemvzPF6qiU1hXmq9zcbXHDq23zNk2bGoQD/xBLC
mbHWQdgSJmJWN0L96uZNP83a9jaUy8ixO9U0m6qJAoGAIG1aAjYsfHBoSbjOyYne
ZNNKdDzxMjwW07aR4xfHMX/QYgMR7a9KFMua6HiLfXeRs7UfENZ/TRUjYtInvf+e
XsWgO13d4RY59HA6JECWI5x/FIP1/qMC1VTQZQ4TPCmGKWbhwoL4EOZsWlXrA6cO
VHIkDYupTerHNN6iJ4x+7pUCgYEAzLEnC4+SrRdRO1HMJoge/kQ46z/htSvhi1qi
a9JK9Q6l4TjA5hT1H56G1QtYYGDruy+bmpi9CA+Q+1IkjhZAc138DVb2nCQpoTH8
XZzsphvLwUKS905I2L2mdnlt2arId2BTJA6Gwa2pTQEP+Tp1ejvVuK2cnSQA7ohj
5z9kwDkCgYAqweV0DZsdFyy9MAJJOfRSqJN+WnLOOVZ29wSLn8girg4pCZgpUSgq
BPomcxx+fZNpNRJJ0dbzx3pu0MQx0QNvT7Pc6kG4DBFELuRLA87/dmH4fKFoUCKc
NQixnD2xsQRcVeUYpIsoVmSdOQWlsan6CN8zCWvYSpzipJ0eaQQHkQ==
-----END RSA PRIVATE KEY-----
FILE

Vagrant.require_version ">= 1.9.1"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.hostname = "isoft-landings"
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_check_update = true

  # Auto assign IP address and handle it via hosts file
  config.vm.network "private_network", ip: $host_ip
  config.vm.network "forwarded_port", guest: 80, host: $http_ssh
  config.vm.network "forwarded_port", guest: 22, host: $post_ssh, id: "ssh"
  config.ssh.guest_port = $post_ssh
  config.ssh.forward_agent = true

  # Config for plugin Hostsupdater
  # https://github.com/cogitatio/vagrant-hostsupdater
  config.hostsupdater.aliases = [
  	"www.nodejs-intellectsoft.couk.dev", "www.nodejs-intellectsoft.ca.dev", "www.nodejs-intellectsoft.ae.dev", "www.nodejs-intellectsoft.fi.dev", "www.nodejs-intellectsoft.comau.dev", "www.nodejs-intellectsoft.net.dev", "www.nodejs-intellectsoft.se.dev", "www.nodejs-intellectsoft.no.dev",
  	"nodejs-intellectsoft.couk.dev", "nodejs-intellectsoft.ca.dev", "nodejs-intellectsoft.ae.dev", "nodejs-intellectsoft.fi.dev", "nodejs-intellectsoft.comau.dev", "nodejs-intellectsoft.net.dev", "nodejs-intellectsoft.se.dev", "nodejs-intellectsoft.no.dev"
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
    ansible.playbook = "nodejs.yml"
    ansible.inventory_path = "inventories/vagrant/hosts"
    ansible.config_file = "ansible.cfg"
    ansible.provisioning_path = "#{$playbook_path}"
    ansible.sudo = true
    ansible.limit = "all"
    ansible.extra_vars = {
    	build_server: "true",
    	build_landings: "true",
    	build_shortener: "false",
    	git_shortener_branch: "master",
    	build_proxy: "true",
    	fetch_from_s3: "true",
    }
    ansible.host_vars = {
      PROFILE_TASKS_TASK_OUTPUT_LIMIT: '15',
    }
  end
end