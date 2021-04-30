const blog = require("../models/blog")

const dummy = (blogs) => {
    return (
    1
)
}

const totalLikes = (blogs) => {
    const likes = blogs.length === 0 ? 0
        : blogs.reduce((sum, blog) =>
            sum + blog.likes, 0
        )
    return likes
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((fave, blog) => (fave.likes > blog.likes ? fave : blog))
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    }
}


  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }