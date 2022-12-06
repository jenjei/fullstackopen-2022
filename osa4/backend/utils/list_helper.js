// tests in this file

const dummy = (blogs) => {
    return 1
}

// this function returns the total sum of likes
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

// this function returns the most liked (favorite) blog
const favoriteBlog = (blogs) => {
    const favoriteBlog = blogs.reduce(function(prev, current) {
        console.log('previous', prev, 'current', current)
        return (prev.likes > current.likes) ? prev : current
    }) //returns object
    return favoriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}