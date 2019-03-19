# Notice
To successful local vagrantbox deployment process your authorized ssh key for gitlab should be placed in **~/.ssh** directory on your host machine.

# To local deployment without vagrant
Run code below to compile UserTracking and countryList file in shared folder:
`gulp`

Run code below from landings folder after editing landings src/. It will compile files for each landing:
`sh gulpAll.sh`

Run code below for landings platform:
`node app.js`

Check <http://localhost:3100/static/$dir_name/template.html>  
Where `$dir_name` should be replaced with directory name from **landings/** folder.