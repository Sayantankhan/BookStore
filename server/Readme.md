#### GraphQL Queries#######

**Specific book based on id**
{
  book(id:4){
    name
    genre
    author{
      name
    }
  }
}

**Specific author based on id and their written books**
{
	author(id:3){
    age
    books {
      id
    }
  }
  
}

**Get all books wriiten by Authors**
{
  authors{
    name
    books{
      name
      id
    }
  }
}

**Get book based on id and all the list of the books written by that author**
{
  book(id:4){
    name
    author{
      name
      books {
        name
      }
    }
  }
}