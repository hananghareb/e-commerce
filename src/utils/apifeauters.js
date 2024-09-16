export class Apifeatures{
    constructor(mongosequery,searchquery){
        this.mongosequery = mongosequery
        this.searchquery = searchquery
    }

    pagination(){
        let pagenumber = this.searchquery.page*1 || 1
        if(this.searchquery.page<1) pagenumber = 1
        const limit = 3
        let skip = (pagenumber - 1)*limit
        this.pagenumber = pagenumber
        this.mongosequery.skip(skip).limit(limit)
        return this
    }

    filter(){
        let filterobj = structuredClone(this.searchquery)
        filterobj = JSON.stringify(filterobj)
        filterobj= filterobj.replace(/(gt|gte|lt|lte)/g , value=> "$" +value )
        filterobj = JSON.parse(filterobj)
    
        let excludefields = ['search','page','sort','fields']
        excludefields.forEach(val =>{
            delete filterobj[val]
        })    
    
        this.mongosequery.find(filterobj)
        return this
    }

    sort(){
        if(this.searchquery.sort){
            let sortedby = req.query.sort.split(',').join(' ')
           this. mongosequery.sort(sortedby)
    
        }
        return this
    }
    
    fields(){
        if(this.searchquery.fields){
            let selectedfields =this.searchquery.fields.split(',').join(' ')
          this. mongosequery.select(selectedfields)
    
        }
        return this
    }

    search(){
        
    if(this.searchquery.search){
       this. mongosequery.find(
            {
                $or:[
                    {title:{$regex:this.searchquery.search, $options:'i'}  },
                    {description:{$regex:this.searchquery.search, $options:'i'}  },

                ]
            }
        )
    }
    return this
    }
}