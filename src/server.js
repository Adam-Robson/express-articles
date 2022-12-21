import express from 'express';
import { db, connectToDb } from './database.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const article = await db.collection('articles').findOne({ id });
 if (article) {
  res.json(article) 
 } else {
  res.sendStatus(404);
 }
});

app.post('api/articles/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { postedBy, text } = req.body;
  
  await db.collection('articles').updateOne({ id }, {
    $push: { comments: { postedBy, text } } });
  const article = await db.collection('articles').findOne({ id });
  if (article) {
    res.send(article.comments)
  } else {
    res.send('That article does not exist')
  }
});

app.put('/api/articles/:id/upvote', async (req, res) => {
  const { id } = req.params;
  
  await db.collection('articles').updateOne({ id }, { 
    $inc: { upvotes: 1 }})
  
  const article = await db.collection('articles').findOne({ id });
  
  if (article) {
    res.send(`Article ${id} has ${article.upvotes} upvotes`)
  } else {
    res.send(`That article does not exist`);
  }
});

connectToDb(() => {
  console.log('Database connected!');
  app.listen(8000, () => {
    console.log('Server is listening on port 8000');
  });
})
