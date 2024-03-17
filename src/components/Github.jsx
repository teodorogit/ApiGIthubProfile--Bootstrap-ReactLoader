import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "./Loader";
import {Image,Form,Button} from 'react-bootstrap'
import './Github.css'

function Github() {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getGitHubData('');
    }, []);

    const getGitHubData = (_searchTerm) => {
        setIsLoading(true); // Define isLoading como true enquanto a requisição está em andamento
        axios.get(`https://api.github.com/search/users?q=${_searchTerm}`)
            .then(res => {
                // Simula um atraso de 2 segundos antes de definir os dados do usuário e isLoading como false
                setTimeout(() => {
                    setUserData(res.data.items); // Armazena os dados da resposta no estado userData
                    setIsLoading(false); // Define isLoading como false quando a requisição for concluída
                }, 2000);
            })
            .catch(error => {
                console.error('Error fetching GitHub data:', error);
                setIsLoading(false); // Define isLoading como false em caso de erro
            });
    };
    const handleChange =(event)=> {
        setSearchTerm(event.target.value); 
    }

    const handleSubmit =(e)=> {
        e.preventDefault();
        getGitHubData(searchTerm); 
    }

    return (
        <div>
        <h1 style={{textAlign:'center'}}>GitHub users Results</h1>
        <div>
            <Form inline onSubmit={handleSubmit} className="form">
                <Form.Control 
                className="form-child"
                type="text"
                value={searchTerm}
                placeholder="Enter Search Term"
                onChange={handleChange}
                />
                <Button type="submit">Search </Button>
            </Form>
        </div>
        <Loader isLoading={isLoading} />
        {userData && (
            <div className="container">
                {userData.map(user => (
                    <div key={user.id}>
                        <a href={user.html_url}>
                            <Image 
                            width={64}
                            height={64}
                            rounded
                            className="mr-3"
                            src={user.avatar_url}
                            alt="Generic placeholder"
                            />
                        </a>
                        <div>
                            <h5>Login: {user.login}</h5>
                            <p>Id:{user.id}</p>
                        </div>

                    </div>
                    
                ))}
            </div>
        )}
    </div>
    );
}

export default Github;
