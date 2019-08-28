var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op;

/* GET home page. */
// router.get('/', function (req, res, next) {
//   models.Article.findAll().then(articles => {
//     res.json({
//       hello: "world"
//     });
//   })
// });  //promise写法


//文章列表
router.get('/', async function (req, res, next) {
  var currentPage = parseInt(req.query.currentPage) || 1;
  var pageSize = parseInt(req.query.pageSize) || 2;

  // 搜索
  var where = {};
  //模糊查询
  var title = req.query.title;
  if (title) {
    where.title = {
      [Op.like]: '%' + title + '%'
    }
  }

  var result = await models.Article.findAndCountAll({
    order: [
      ['id', 'DESC']
    ],
    where: where,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize
  });
  // res.json(result);
  res.json({
    articles: result.rows,
    pagination: {
      currentPage: currentPage, //当前页
      pageSize: pageSize, //每页生成多少条
      //一共有多少条记录
      total: result.count
    }
  })

});

// router.post('/', async function (req, res, next) {
//   var articles = await models.Article.create({
//     title: "今天吃什么？",
//     content: "米饭"
//   });
//   res.json({
//     articles: articles
//   }); //es7
// });   //新增文章接口

//新增
router.post('/', async function (req, res, next) {
  // res.json({
  //   '你发送的内容是': req.body //接收用户内容
  // }); //es7

  var Article = await models.Article.create(req.body)
  res.json({
    article: article
  }); //接收用户内容
});


//查看单条文章接口
router.get('/:id', async function (req, res, next) {
  var article = await models.Article.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Comment],
  })

  res.json({
    article: article
  });
  //接收用户内容
});


//修改文章接口
router.put('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  article.update(req.body);
  res.json({
    article: article
  }); //接收用户内容
});

//删除文章接口
router.delete('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  article.destroy();
  res.json({
    msg: '删除成功'
  }); //接收用户内容
});
module.exports = router;