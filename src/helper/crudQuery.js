const crudQuery_runner = async(method_name="",query_model_name="",where_condition="",raw="",attributes_arr="",data_order="",payload="",include_model="")=>{
    try{
        if(method_name==="find_data"){
            let data = await query_model_name.findAll({
                where:where_condition,
                raw:raw ? raw : "",
                include:include_model ? include_model : "",
                attributes:attributes_arr,
                order:data_order ? data_order : "",
            })
            if(data && data.length>0){
                return data
            }
            else{
                return [];
            }
        }
        else if(method_name === "create_data"){
            let data = await query_model_name.create(payload);
            return data;
        } 
        else if(method_name ==="update_data"){
            let data = await query_model_name.update(payload,{where:where_condition});
            return data
        }
        else if(method_name === "create_data_multiple"){
            let data = await query_model_name.bulkCreate(payload);
            return data;
        }
        else if(method_name === "delete_data_multiple"){
            let data = await query_model_name.destroy(where_condition);
            return data;
        }  
    }
    catch(err){
        console.log(err)
        return err
    }
}

module.exports = {
    crudQuery_runner
}