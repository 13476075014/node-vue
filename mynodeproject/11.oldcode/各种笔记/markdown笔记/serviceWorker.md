## serviceWorker

> 参考地址：https://www.jianshu.com/p/cd9a33ecb621； https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API

#### 一：概念

Service workers 本质上充当web应用程序与浏览器之间的代理服务器；

也可以在网络可用时作为浏览器和网络间的代理；

它们旨在使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新资源是否驻留在服务器上来采取适当的动作，还允许访问推送通知和后台同步API。

#### 二：使用前需要注意和设置得

2.1 在已经支持 serivce workers 的浏览器的版本中，很多特性没有默认开启。如果你发现示例代码在当前版本的浏览器中怎么样都无法正常运行，你可能需要开启一下浏览器的相关配置：

- **Firefox Nightly**: 访问 `about:config` 并设置 `dom.serviceWorkers.enabled` 的值为 true; 重启浏览器；
- **Chrome Canary**: 访问 `chrome://flags` 并开启 `experimental-web-platform-features`; 重启浏览器 (注意：有些特性在Chrome中没有默认开放支持)；
- **Opera**: 访问 `opera://flags` 并开启` ServiceWorker 的支持`; 重启浏览器。 

2.2 还需要注意只有https的协议和localhost是有效的，因为Service Workers为了网站安全考虑；

![sw-events](C:\Users\spring\Downloads\sw-events.png)

三：service workers的简单使用步骤

3.1 判断浏览器是否支持该api,如果支持就注册该方法，具体代码如下

```javascript
// app.js
if ('serviceWorker' in navigator) {//判断是否支持
    //注册方法，作用域
  navigator.serviceWorker.register('/sw-test/sw.js', { scope: '/sw-test/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
```

注册该方法的js代码/sw-test/sw.js如下：

```javascript
// /sw-test/sw.js
//self代表作用域内的serviceworker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) { //查看缓存里面是否有，有的话直接从缓存取，否则去网站拉取资源缓存起来
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
      });
    }
  }));
});

```

#### 四：为什么我的 service worker 注册失败了？

可能是如下的原因：

1. 你没有在 HTTPS 下运行你的程序
2. service worker文件的地址没有写对— 需要相对于 origin , 而不是 app 的根目录。在我们的例子例， service worker 是在 `https://mdn.github.io/sw-test/sw.js`，app 的根目录是 `https://mdn.github.io/sw-test/`。应该写成 `/sw-test/sw.js` 而非 `/sw.js`.
3.  service worker 在不同的 origin 而不是你的app的，这是不被允许的。