# API Documentation
This document explains how we get data from the MongoDB.

To get all the data:
```
localhost:3000/NameOfCollection
```

For specific data such as in a particular city:
```
localhost:3000/NameOfCollection?city=NameOfCity
```

Or in a particular categorize:
```
localhost:3000/NameOfCollection?cat=NameOfCategorize
```

Or together :)
```
localhost:3000/NameOfCollection?city=NameOfCity&cat=NameOfCategorize
```

Follow the table to switch variables:

Variables | Values 
--- | --- 
`NameOfCollection` | Products \|\| Places 
`NameOfCity` | جدة \|\| مكة \|\| الرياض  
`NameOfCategorize` | اجهزة \|\| حراج \|\| العاب فيديو \|\| اثاث \|\| أزياء 
