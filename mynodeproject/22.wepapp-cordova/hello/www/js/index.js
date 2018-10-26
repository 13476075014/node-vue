/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor 初始化函数
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false); // 绑定一个设备准备好后就触发的事件onDeviceReady
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() { // 设备准备好后触发的事件
        this.receivedEvent('deviceready');
        var openCameraBtn = document.querySelector('.openCameraBtn');
        alert(openCameraBtn)
        openCameraBtn.addEventListener('click', this.cameraTakePicture(1).bind(this));
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    // 调用手机相机的事件
    cameraTakePicture(openType) {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50, // 设置相片的分表率质量 0-100之间，默认是50
            destinationType: 1, // 照完相片返回的格式 DATA_URL(0): 返回base64你编码的图片字符串； FILE_URI(1): 返回文件uri,android ; NATIVE_URI(2):返回原生uri,ios。 
            encodingType: Camera.EncodingType.JPEG, // 选择返回的图片格式 JPEG(0) ; PNG(1)
            allowEdit: true,
            sourceType: openType // 拍完后从哪里选图片 Camera.PictureSourceType.PHOTOLIBRARY(0): 从相册里面选 ；
                // Camera.PictureSourceType.CAMERA(1): 选刚拍的照片  ； Camera.PictureSourceType.SAVEDPHOTOALBUM(2)从相机胶卷相册选
        })
    },

    //相机调用拍摄成功的回调函数
    onSuccess(imageUrl) {
        alert("成功")
    },

    //相机调用拍摄失败的回调函数
    onFail(message) {
        alert("失败")
    }

};

app.initialize();