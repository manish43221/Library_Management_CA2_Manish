const express=require("express")
const Book=require("../models/booksSchema.js")
const router=express.Router()


router.get('/', async (req, res) => {
  try {
    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;
    const skip= (page-1)*limit;
    const books = await Book.find().skip(skip).limit(limit);
    const totalbooks = await Book.countDocuments();
    res.status(200).json({
      page: page,
      totalbooks: totalbooks,
      books: books
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/',async(req, res) => {
  try {
    const title=req.body.title;
    const author=req.body.author;
    const category=req.body.category;
    if (!title || !author || !category) {
      return res.status(400).json({ message:'Fields are required' });
    }
    const book = await Book.create({
        title:title,
        author:author,
        category:category
    })
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
try{
    const book=await Book.findByIdAndUpdate(req.params.id,
      {isAvailable:req.body.isAvailable},
      {new:true}
    );
 if(!book) {
return res.status(404).json({ message:'Book is not found' });
    }
res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports=router;







