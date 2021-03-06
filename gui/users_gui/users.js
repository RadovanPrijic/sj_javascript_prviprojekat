const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllUsers(){
    fetch('http://127.0.0.1:8500/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("usrLst").innerHTML = "";
                const lst = document.getElementById('usrLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, Prezime: ${el.last_name},  
                            Datum rođenja: ${el.birth_date}, Država prebivališta: ${el.country_of_residence},
                                ELO: ${el.elo_rating}</li>`;
                    });
                }
        });
}

function getUserById(){
    const id = document.getElementById('userId').value;

    fetch('http://127.0.0.1:8500/admin/users/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("usrLst").innerHTML = "";
                document.getElementById('userId').value = "";
                const lst = document.getElementById('usrLst');

                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name}, Prezime: ${data.last_name},  
                        Datum rođenja: ${data.birth_date}, Država prebivališta: ${data.country_of_residence},
                            ELO: ${data.elo_rating}</li>`;
                }
        });
}

function initPostUser(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            birth_date: document.getElementById('birth_date').value,
            country_of_residence: document.getElementById('country').value,
            elo_rating: document.getElementById('elo_rating').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            moderator: document.getElementById('moderator').checked,
            player: document.getElementById('player').checked
        };

        document.getElementById('usrLst').innerHTML = "";
        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('birth_date').value = "";
        document.getElementById('country').value = "";
        document.getElementById('elo_rating').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('admin').checked = false;
        document.getElementById('moderator').checked = false;
        document.getElementById('player').checked = false;

        fetch('http://127.0.0.1:8500/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, 
                        Prezime: ${el.last_name}, Datum rođenja: ${el.birth_date}, 
                            Država prebivališta: ${el.country_of_residence}, ELO: ${el.elo_rating}</li>`;
                }
            });
    });   
}

function initUpdateUser(){

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('user_id').value;

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            birth_date: document.getElementById('birth_date').value,
            country_of_residence: document.getElementById('country').value,
            elo_rating: document.getElementById('elo_rating').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            moderator: document.getElementById('moderator').checked,
            player: document.getElementById('player').checked
        };

        document.getElementById('usrLst').innerHTML = "";
        document.getElementById('user_id').value = "";
        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('birth_date').value = "";
        document.getElementById('country').value = "";
        document.getElementById('elo_rating').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('admin').checked = false;
        document.getElementById('moderator').checked = false;
        document.getElementById('player').checked = false;

        fetch('http://127.0.0.1:8500/admin/users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, 
                        Prezime: ${el.last_name}, Datum rođenja: ${el.birth_date}, 
                            Država prebivališta: ${el.country_of_residence}, ELO: ${el.elo_rating}</li>`;
                }
            });
    });   
}

function deleteUser(){
    const id = document.getElementById('userId').value;

    fetch('http://127.0.0.1:8500/admin/users/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("usrLst").innerHTML = "";
                document.getElementById('userId').value = "";
                const lst = document.getElementById('usrLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name}, Prezime: ${data.last_name},  
                        Datum rođenja: ${data.birth_date}, Država prebivališta: ${data.country_of_residence},
                            ELO: ${data.elo_rating}</li>`;
                }
            });
}