// tests in this file

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 1) {
        var blog = blogs.find(blog => blog.likes)
        return blog.likes
    } 
    else { 
        var totalLikes = blogs.reduce(function (sum, blog) {
            console.log('hello', sum, blog.likes)
            return sum + blog.likes
        }, 0)
        return totalLikes
    }
}
  
module.exports = {
    dummy,
    totalLikes
}