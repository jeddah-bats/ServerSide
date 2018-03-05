# API Documentation
This document explains how we get data from the MongoDB.

To get all the data:
```
localhost:3000/NameOfCollection
```

The data will appear in this format:
```
{
"_id": "000000000000",
"name": " Product Name",
"link": "https://...........",
"price": "3,000",
"date": "2018-02-18",
"city": "مكة",
"cat": "اجهزة"
}
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
