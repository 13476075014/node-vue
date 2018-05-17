	<h3>文件柜</h3>
    <hr data-am-widget="divider" style="" class="am-divider am-divider-dotted" />
    <div id="dig_nav">
    <?php
    
		if ($_GET['path']==''){
        	$path='../../upload/';
			echo '根目录';
		}else{
			$path=$_GET['path'];
			
			$pathreturnul=str_replace("/*","",$path.'*');
			$pathR=strrpos($pathreturnul,'/');
			$filesname=substr($pathreturnul,$pathR+1);
			$pathreturnul=str_replace($filesname."/*","",$path.'*');
			if ($filesname!='upload'){
	?>
				<a class="hand" onClick="sys_dig_files('<?php echo $pathreturnul?>')">返回上一级</a> / <?php echo $filesname?>
	<?php
			}else{
				echo '根目录';
			}
		}
	?>

    </div>
    
    <div id="dig_files_main">
    
    
    	<ul>
        
        <?php
		echo '<li class="type-add">上传文件</li>';
        $dir = opendir($path);
        while (($file = readdir($dir)) !== false)
            {
                if ($file!='.' && $file!='..'){
					if (is_dir($path.$file)){
						echo '<li class="folder" onClick="sys_dig_files(\''.$path.$file.'/\')">'.$file.'</li>';
					}else{
						$point_num=strpos($file,'.');
						if ($point_num>-1){
							
							$houzhuiming=substr($file,$point_num+1);
							if (file_exists('../../images/Suffix/'.$houzhuiming.'.jpg')){
								if ($houzhuiming=='jpg' || $houzhuiming=='png'  || $houzhuiming=='jpeg'  || $houzhuiming=='gif'){
									echo '<li style="background-image:url('.$path.$file.'");" >'.iconv('GB2312','UTF-8',$file).'</li>';
								}else{
									echo '<li style="background-image:url(images/Suffix/'.$houzhuiming.'.jpg);" >'.iconv('GB2312','UTF-8',$file).'</li>';
								}
							}else{
								echo '<li class="type-null" >'.iconv('GB2312','UTF-8',$file).'</li>';
								
							}
						}
						
					}
                }
        
            }
        
        ?>

        </ul>
    </div>
