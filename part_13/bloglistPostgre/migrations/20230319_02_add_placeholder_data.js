module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.bulkInsert('users', [
        {
            username: 'johndoe@example.com',
            name: 'John Doe',
            admin: true,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'janedoe@example.com',
            name: "Jane Smith",
            admin: false,
            disabled: true,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'michalejackson@example.com',
            name: "Bob Johnson",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            username: 'miketyson2231@example.com',
            name: "Mary Lee",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            name: "David Kim",
            username: "davidkim@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Emily Chen",
            username: "emilychen@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Michael Lee",
            username: "michaellee@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Sarah Wilson",
            username: "sarahwilson@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "William Garcia",
            username: "williamgarcia@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
          {
            name: "Jennifer Patel",
            username: "jenniferpatel@example.com",
            admin: false,
            disabled: false,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ]
      )
      await queryInterface.bulkInsert('blogs', [
        {
            url: 'https://example.com/beginners-guide-python-programming',
            author: 'John Smith',
            title: 'A Beginners Guide to Python Programming',
            likes: 7,
            user_id: 2,
            year: 2007,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            url: 'https://example.com/10-common-mistakes-javascript-programming',
            author: 'Sarah Johnson',
            title: '10 Common Mistakes in JavaScript Programming and How to Avoid Them',
            likes: 18,
            user_id: 4,
            year: 1994,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            url: 'https://example.com/best-resources-learning-ruby-on-rails',
            author: 'Michael Brown',
            title: 'The Best Resources for Learning Ruby on Rails',
            likes: 8,
            user_id: 3,
            year: 2012,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            url: 'https://example.com/build-restful-api-nodejs-express',
            author: 'Emily Davis',
            title: 'How to Build a RESTful API with Node.js and Express',
            likes: 12,
            user_id: 1,
            year: 2019,
            created_at: new Date(),
            updated_at: new Date(),
        },
      ])
    },
  
    down: async ({context: queryInterface}) => {
        await queryInterface.bulkDelete('blogs')
        await queryInterface.bulkDelete('users')
    },
  }