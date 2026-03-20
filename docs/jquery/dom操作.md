# DOM 操作

jQuery 让 DOM 操作变得极其简单，原生需要多行代码的操作，jQuery 通常一行就能完成。

---

## 内容操作

### 获取和设置 HTML

```javascript
// 获取 HTML 内容
var html = $('#content').html()

// 设置 HTML（会解析标签）
$('#content').html('<p>新的段落</p>')

// ❗注意：.html() 会解析 HTML 标签，有 XSS 风险
// 如果内容来自用户输入，请用 .text()
```

### 获取和设置文本

```javascript
// 获取纯文本（不解析 HTML）
var text = $('#content').text()

// 设置纯文本
$('#content').text('纯文本内容')
```

### 获取和设置值

```javascript
// 表单元素的值
var val = $('#input').val()           // 获取
$('#input').val('新值')                // 设置

// 多选框/单选框
$('input[name=gender]').val()        // 获取选中值
$('input[name=gender][value=male]').prop('checked', true)  // 设置选中
```

---

## 属性操作

```javascript
// 获取/设置属性
var src = $('img').attr('src')                // 获取
$('img').attr('src', 'new.jpg')              // 设置
$('img').attr({
    src: 'new.jpg',
    alt: '新图片'
})

// 删除属性
$('img').removeAttr('src')

// class 操作
$('.box').addClass('active')                 // 添加
$('.box').removeClass('old')                 // 删除
$('.box').toggleClass('hidden')              // 切换

// 检查是否包含某 class
if ($('.box').hasClass('active')) {
    console.log('有 active 类')
}
```

---

## 增删节点

### 添加元素

```javascript
// 追加内容（内部）
$('#list').append('<li>新项目</li>')           // 添加到末尾
$('#list').prepend('<li>第一项</li>')         // 添加到开头

// 外部添加
$('.item').after('<p>在 item 后面</p>')      // 后面插入
$('.item').before('<p>在 item 前面</p>')     // 前面插入

// 包裹元素
$('span').wrap('<b></b>')                    // 每个 span 用 <b> 包裹
$('span').wrapAll('<div class="wrapper"></div>')  // 所有 span 一起包裹
$('span').unwrap()                           // 移除父元素，保留自身
```

### 删除和清空

```javascript
// 删除元素（自身及子元素）
$('#item').remove()          // 删除 #item

// 只删除子元素，保留自身
$('#item').empty()           // 清空 #item 的内容

// 删除同时过滤
$('li').remove('.completed') // 删除所有有 completed 类的 li
```

---

## 遍历

```javascript
// each 遍历
$('li').each(function(index, element) {
    // this 指向当前 DOM 元素
    // index 从 0 开始
    console.log(index, $(this).text())
})

// map 映射（返回新数组）
var texts = $('li').map(function() {
    return $(this).text()
}).get()  // get() 将 jQuery 对象转为数组
```

---

## 样式操作

```javascript
// 获取/设置样式
$('#box').css('color')            // 获取
$('#box').css('color', 'red')     // 设置
$('#box').css({
    'color': 'red',
    'font-size': '16px',
    'background-color': '#f0f0f0'
})

// 获取 CSS 属性（考虑 computed style，推荐）
$('#box').css('width')            // 获取实际宽度

// 获取元素的几何尺寸
$('#box').width()                 // 内容宽度（不包括 padding/border）
$('#box').innerWidth()            // 包含 padding
$('#box').outerWidth()            // 包含 padding 和 border
$('#box').outerWidth(true)        // 包含 padding、border、margin

// 获取位置
$('#box').offset()                // 相对于文档的位置 {top: 100, left: 200}
$('#box').position()              // 相对于父元素的位置
```

---

## 常用示例

```javascript
// 1. 显示/隐藏元素
$('#box').show()                 // 显示（display: block）
$('#box').hide()                 // 隐藏（display: none）
$('#box').toggle()               // 切换显示状态

// 2. 获取表单值
var username = $('#username').val()
var isChecked = $('#agree').prop('checked')

// 3. 动态创建列表
var data = ['苹果', '香蕉', '橙子']
$.each(data, function(i, fruit) {
    $('#list').append('<li>' + fruit + '</li>')
})

// 4. 清空表单
$('form')[0].reset()             // 原生重置
$('input[type=text]').val('')    // 清空文本框
$('input[type=checkbox]').prop('checked', false)  // 取消全选
```

---

## 完整示例：待办事项列表

```html
<ul id="todo-list"></ul>
<input id="new-todo" type="text">
<button id="add-btn">添加</button>
```

```javascript
// 添加新任务
$('#add-btn').click(function() {
    var task = $('#new-todo').val().trim()
    if (task) {
        $('#todo-list').append('<li>' + task + '</li>')
        $('#new-todo').val('')
    }
})

// 完成任务（点击即划掉）
$('#todo-list').on('click', 'li', function() {
    $(this).toggleClass('completed')
})

// 删除已完成任务
$('#clear-completed').click(function() {
    $('#todo-list li.completed').remove()
})
```

---

掌握了 DOM 操作后，我们就可以处理用户交互了——下一节学习**事件处理**。