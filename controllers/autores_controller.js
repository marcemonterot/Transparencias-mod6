exports.autores=function(req,res){
  res.render('author',{title:'Autores',
                      autor:'Marcelino Montero Torres',
                      imagen:'/images/rafa.png'}
            );
}
