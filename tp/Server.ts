import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs'; // Importer le module fs
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

// Configurer le dossier public pour servir des fichiers statiques
app.use(express.static('public'));

// Route pour afficher index.html à la racine
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Interface pour un livre
interface IBook {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: string;
    price: number;
    format: string;
    suggestedBy: string;
    finished: boolean;
}

// Tableau pour stocker les livres en mémoire
const books: IBook[] = [];

// Route pour ajouter un livre
app.post('/api/books', async (req: Request, res: Response) => {
    const { title, author, pages, pagesRead, status, price, format, suggestedBy, finished } = req.body;
    const newBook: IBook = { title, author, pages, pagesRead, status, price, format, suggestedBy, finished };

    try {
        // Ajouter le livre au tableau
        books.push(newBook);
        
        // Préparer les données pour écrire dans le fichier texte
        const bookData = `Title: ${title}, Author: ${author}, Pages: ${pages}, Pages Read: ${pagesRead}, Status: ${status}, Price: ${price}, Format: ${format}, Suggested By: ${suggestedBy}, Finished: ${finished}\n`;

        // Ajouter les données au fichier books.txt
        fs.appendFileSync('books.txt', bookData, 'utf8');
        console.log('Book data written to books.txt');

        // Envoyer une réponse au client
        res.status(201).send(newBook);
    } catch (error) {
        console.error("Error saving book or writing to file:", error);
        res.status(400).send(error);
    }
});

// Route pour récupérer tous les livres
app.get('/api/books', (req: Request, res: Response) => {
    res.status(200).send(books);
});

const PORT = 8082;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
