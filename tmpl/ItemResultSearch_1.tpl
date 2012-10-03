<script id="serchResult2" type="text/x-jquery-tmpl">
    <link href="css/inubi-1.0.0.css" rel="stylesheet">
    <div class="iub-item-Result-Search" >
        <div class="iub-item-Result-Search-Head" >
            <div style="float: left">
                <img class="iub-border-shadow" src="img/user.png" />
            </div>
            <div class="iub-item-Result-Search-Like" >	
                <p><i class="icon-thumbs-up"></i><span class="badge badge-info">${NroLike}</span></p>
		<p><i class="icon-share icon-blue"></i></p>
                <p><i class="icon-camera icon-blue"></i></p>
                <p><i class="icon-comment icon-blue" onmouseover=""></i></p>                
            </div>
            <div  class="iub-item-Result-Search-Title" >
                <p><strong>${Nombre} ${Apellido} </strong> <span class="iub-item-Result-Search-Date" >${Date}</span></p>
                
                <p><strong>Acción: </strong>${Accion}    
                <strong>  Motivo: </strong>${Motivo}</p>
                <p><strong>Localizacion: </strong>${Geolocalizacion} <i class="icon-screenshot icon-blue"></i></p>
            </div>			
	</div>
        <div class="iub-item-Result-Search-Body" >				
            <p>${Descripcion}</p>           
	</div>
    </div>
</script>