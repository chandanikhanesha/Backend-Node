pm2 start node app.js -n "websiteNode"
cd foldername
ssh root@143.244.138.81
 sudo apt install filezilla
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

//for security//sudo chmod 400 streamit.pem 
ssh -i streamit.pem root@128.199.20.5

 cd /var/www/html/

//// xampp service start and stop


sudo service apache2 stop
sudo service mysql stop
sudo /opt/lampp/lampp restart


//////cd streamiltbackend
git config user.name "rajnavdiya6"
git config user.email "rajnavadiya6@gmail.com"
git add.
git commit -m "change in mail model"
git push origin main

pm2 list
pm2 restart index

cd streamiltbackend
node index js
///if pm2 services stop

pm2 start index.js






mytoken:-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

///ok if some one signsup in freefireindia.tech can we make it so that they can use the same id to sign in to streamit.co.in ?


  $curl = curl_init();
                        $curl_data = array(
                            'email' => $this->input->post('email_id'),
                            'password' => $this->input->post('password'),
                        );
                        curl_setopt_array($curl, array(
                            CURLOPT_URL => "https://streamit.co.in/api/v1/register",
                            CURLOPT_RETURNTRANSFER => true,
                            CURLOPT_ENCODING => "",
                            CURLOPT_MAXREDIRS => 10,
                            CURLOPT_TIMEOUT => 0,
                            CURLOPT_FOLLOWLOCATION => true,
                            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                            CURLOPT_CUSTOMREQUEST => "POST",
                            CURLOPT_POSTFIELDS => json_encode($curl_data),
                            CURLOPT_HTTPHEADER => array(
                                "Content-Type: application/json"
                            ),
                        ));
                        $response = curl_exec($curl);
                        curl_close($curl);
