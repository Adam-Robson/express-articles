import express from 'express';
let articlesInfo = [
  {
  id: '1',
  upvotes: 0,
  comments: []
},
{
  id: '2',
  upvotes: 0,
  comments: []
},
{
  id: '3',
  upvotes: 0,
  comments: []
}
]

const app = express();
app.use(express.json());

app.put('/api/articles/:id/upvote', (req, res) => {
  const { id } = req.params;
  const article = articlesInfo.find(a => a.id === id);
  if (article) {
    article.upvotes += 1; 
    res.send(`The ${id} article has ${article.upvotes} upvotes`)
  } else {
    res.send(`That article does not exist`);
  }
});

app.post('/api/articles/:id/comments', (req, res) => {
  const { id } = req.params;
  const { postedBy, text } = req.body;
   const article = articlesInfo.find(a => a.id === id)
  if (article) {
    article.comments.push( { postedBy, text });
    res.send(article.comments);
  } else {
    res.send(`That article does not exist`);
  }
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
