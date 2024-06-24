import express from 'express';
import z from 'zod';
import { jsonplaceholderResponse } from './schemas/jsonplaceholderResponse';

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get('/ping', (req, res) => {
    res.json({pong: true});
});

server.post('/user', (req, res) => {
    const useSchema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        age: z.number().min(18).max(120)
    });

    const result = useSchema.safeParse(req.body);
    if(!result.success){
        return res.json({error: "Invalid data"});
    }

    const { name, email, age } = result.data;

    console.log('Processando...');
    console.log(name, email, age);

    res.status(201).json({result: 'Tudo ok'});

});

server.get('/posts', async (req, res) =>{
    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await request.json();

    const result = jsonplaceholderResponse.safeParse(data);
    if(!result.success){
        return res.status(500).json({error: 'ERRO'});
    }

    let totalPosts = result.data.length;

    res.json({total: totalPosts});

    console.log(result);
    
    res.json({});
});

server.listen(3000, () => {
    console.log('http://localhost:3000/');
})  