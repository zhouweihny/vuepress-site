# AJAX 请求

jQuery 封装了 `XMLHttpRequest`，让异步请求变得极其简单。

---

## 基础方法

### GET 请求

```javascript
// $.get(url, data, success, dataType)
$.get('/api/users', { page: 1, limit: 10 }, function(response) {
    console.log(response)  // 返回的数据
}, 'json')

// 简化版（只有 url 和成功回调）
$.get('/api/info', function(data) {
    console.log(data)
})
```

### POST 请求

```javascript
// $.post(url, data, success, dataType)
$.post('/api/login', {
    username: 'admin',
    password: '123456'
}, function(res) {
    if (res.success) {
        alert('登录成功')
    }
}, 'json')
```

---

## 完整方法：$.ajax()

`$.ajax()` 提供最完整的控制：

```javascript
$.ajax({
    url: '/api/users',
    type: 'GET',              // 或 'POST', 'PUT', 'DELETE' 等
    method: 'GET',            // type 和 method 等价
    data: {
        page: 1,
        limit: 20
    },
    dataType: 'json',         // 期望返回的数据类型
    contentType: 'application/x-www-form-urlencoded',  // 发送的数据类型
    timeout: 5000,            // 超时时间（ms）
    beforeSend: function(xhr, settings) {
        // 发送前可以修改请求头
        xhr.setRequestHeader('Authorization', 'Bearer token')
        console.log('请求即将发送')
    },
    success: function(data, textStatus, xhr) {
        console.log('成功:', data)
    },
    error: function(xhr, textStatus, errorThrown) {
        console.error('失败:', textStatus, errorThrown)
        console.log(xhr.status)   // HTTP 状态码
        console.log(xhr.responseText)  // 错误信息
    },
    complete: function(xhr, textStatus) {
        console.log('请求完成（无论成功失败）')
    }
})
```

---

## 常用配置

| 配置项 | 说明 |
|--------|------|
| `url` | 请求地址 |
| `type` / `method` | 请求方法，默认 GET |
| `data` | 发送的数据（自动序列化） |
| `dataType` | 期望返回的数据类型：`json`, `text`, `html`, `script`, `xml` |
| `contentType` | 发送内容的 MIME 类型，默认 `application/x-www-form-urlencoded` |
| `headers` | 额外的请求头 `{ 'X-Custom': 'value' }` |
| `timeout` | 超时时间（ms） |
| `cache` | 是否缓存（GET 请求默认 true，可设为 false 添加 `_={timestamp}` 避免缓存） |
| `async` | 是否异步，默认 true（一般不用改） |

---

## 示例场景

### 1. 获取 JSON 数据

```javascript
$.ajax({
    url: '/api/posts',
    method: 'GET',
    dataType: 'json',
    success: function(posts) {
        $.each(posts, function(i, post) {
            $('#posts').append(
                '<div class="post"><h3>' + post.title + '</h3>' + post.content + '</div>'
            )
        })
    },
    error: function() {
        $('#posts').html('<p>加载失败，请刷新重试</p>')
    }
})
```

### 2. 提交表单（AJAX）

```javascript
$('#login-form').submit(function(e) {
    e.preventDefault()
    
    var formData = $(this).serialize()  // 自动将表单序列化为字符串
    
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: formData,
        beforeSend: function() {
            $('#submit-btn').prop('disabled', true).text('登录中...')
        },
        success: function(res) {
            if (res.code === 0) {
                alert('登录成功')
                window.location.href = res.redirect || '/dashboard'
            } else {
                alert('登录失败: ' + res.message)
            }
        },
        error: function() {
            alert('网络错误，请稍后重试')
        },
        complete: function() {
            $('#submit-btn').prop('disabled', false).text('登录')
        }
    })
})
```

### 3. 文件上传（FormData）

```javascript
$('#upload-form').submit(function(e) {
    e.preventDefault()
    
    var formData = new FormData(this)  // 原生 FormData（jQuery 不自动序列化文件）
    
    $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        processData: false,   // 不处理数据（让浏览器用 multipart/form-data 发送）
        contentType: false,   // 不设置 content-type（让浏览器自动设置 boundary）
        success: function(res) {
            console.log('上传成功', res.url)
        }
    })
})
```

---

## 全局 AJAX 事件

```javascript
// 在所有 AJAX 请求开始时触发
$(document).ajaxStart(function() {
    $('#loading').show()
})

// 在所有 AJAX 请求完成时触发（包括失败）
$(document).ajaxStop(function() {
    $('#loading').hide()
})

// 单个请求的错误处理（可以统一处理）
$(document).ajaxError(function(event, xhr, settings, thrownError) {
    console.log('AJAX 错误:', settings.url, thrownError)
})
```

---

## 简化的方法

jQuery 为常见场景提供了快捷方法：

```javascript
$.getJSON('/api/data', function(data) {
    // 自动解析 JSON
    console.log(data)
})

$.getScript('/js/plugin.js', function() {
    // 加载并执行远程脚本
    console.log('脚本加载完成')
})
```

---

## 跨域请求（CORS）

如果你的前端和后端不在同一个域名，后端需要设置 CORS 头：

```http
Access-Control-Allow-Origin: https://your-site.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

jQuery 会自动处理简单的跨域请求（使用 `XMLHttpRequest` 或 `JSONP`）。

**JSONP**（旧方案，后端需支持）：

```javascript
$.ajax({
    url: 'http://api.other.com/data?callback=?',
    dataType: 'jsonp',  // 用 script 标签绕过同源策略
    success: function(data) {
        console.log(data)
    }
})
```

---

## 错误处理最佳实践

```javascript
function apiRequest(options) {
    return $.ajax($.extend({
        url: '',
        type: 'GET',
        dataType: 'json',
        timeout: 10000,
        error: function(xhr, status, err) {
            console.error('API Error:', {
                url: options.url,
                status: status,
                error: err,
                response: xhr.responseText
            })
            // 友好提示
            alert('网络请求失败，请检查连接')
        }
    }, options))
}

// 使用
apiRequest({
    url: '/api/users',
    success: function(users) {
        console.log(users)
    }
})
```

---

## 完整示例：用户列表加载

```html
<button id="load-btn">加载用户</button>
<div id="user-list"></div>
```

```javascript
$('#load-btn').click(function() {
    $(this).prop('disabled', true).text('加载中...')
    
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users',
        method: 'GET',
        dataType: 'json',
        success: function(users) {
            var html = ''
            $.each(users, function(i, user) {
                html += '<div class="user">' +
                            '<h4>' + user.name + '</h4>' +
                            '<p>' + user.email + '</p>' +
                        '</div>'
            })
            $('#user-list').html(html)
        },
        error: function() {
            $('#user-list').html('<p class="error">加载失败，请重试</p>')
        },
        complete: function() {
            $('#load-btn').prop('disabled', false).text('加载用户')
        }
    })
})
```

---

## 下一节

掌握了 AJAX 后，我们已经可以完成大部分前端交互。最后我们来**总结 jQuery 的核心思想**和**学习建议**。