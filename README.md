# keyBoardNum
�ƶ������ּ��̲�����ò��������zepto����jquery
## Ч��ͼ
[tu](./xgt.png)
## ʹ�÷���  
��ҳ��������zepto����jquery
```javascript
<script type="text/javascript" src="zepto.min.js"></script>
```
Ȼ������keyboardNum(ҳ���е�css�Ѿ�ȫ�������js���ˣ���������css)
```javascript
<script type="text/javascript" src="keyboardNum.js"></script>
```
�����ļ�����֮��Ϳ��Գ�ʼ��������
```javascript
var key = new KeyBoardNum('#input',{
    decimal:5,
    integer:3,
    btnCallBack:function(num){
        console.log(num);
    }
});
key.show();
//Ҳ֧����ʽ����
var key = new KeyBoardNum('#input',{
    decimal:5,
    integer:3,
    btnCallBack:function(num){
        console.log(num);
    }
}).show();
```

## ����˵��
KeyBoradNum��������������

1����һ����������ʾ��������ֵ�Ԫ��(֧��һ�кϷ���Ԫ��ѡ������)�����Ԫ�ز�����input����textarea

2���ڶ�������option��һ����������������

| �������� | ����˵�� | Ĭ��ֵ |
| ------------- |:-------------| :-----|
| itemHeight | һ�����ּ��ĸ߶� | 60 |
|decimal|�����С���㳤��| 2 |
|integer|������������ֳ���| 4 |
|fontSize|���������С|'30px'|
|color|���ֵ���ɫ|'#333'|
|bgColor|������ɫ|'#fff'|
|borderColor|�߿���ɫ|'#E5E5E5'|
|activeColor|���̱����ʱ�ı�����ɫ|'#ebebeb'|
|btnText|��ť��ʾ������|'ȷ��'|
|btnColor|��ť���ֵ���ɫ|'#fff'|
|btnFontSize|��ť���ִ�С|'70px'|
|btnBgColor|��ť�ı�����ɫ|'#bcbcbc'|
|btnActiveBgColor|��ť����ı�����ɫ|'#fe9b20'|
|btnTouchBgColor|��ť����󱻵��ʱ�ı�����ɫ|'#e27d00'|
|btnCallBack|��ť�����Ļص�|null|
|delImg|ɾ����ťͼƬ|Ĭ��ֵ��base64��ʽ�洢��js��|
|hideImg|���ذ�ťͼƬ|Ĭ��ֵ��base64��ʽ�洢��js��|