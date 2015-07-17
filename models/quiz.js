module.exports=function(sequelize, DataTypes){
  return sequelize.define('Quiz',{
                                  pregunta:{
                                    type: DataTypes.STRING,
                                    validate :{notEmpty:{msg:"-> falta la pregunta"}}
                                  },
                                  respuesta:{
                                    type: DataTypes.STRING,
                                    validate :{notEmpty:{msg:"-> falta la respuesta"}}
                                  },
                                  tema:{
                                    type: DataTypes.STRING
                                  }
                                });
};
