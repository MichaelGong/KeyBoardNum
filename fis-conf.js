
fis.match('*.js', {
    // fis-optimizer-uglify-js �������ѹ����������
    optimizer: fis.plugin('uglify-js'),
	useHash:false
});
