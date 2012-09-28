<script id="itemAmigo" type="text/x-jquery-tmpl">
  <div class="iub-tpl-amigos" onmouseover="showAccionesAmigos(this)">
    <div class="iub-float-left">
      <img src="${picture.data.url}" class="iub-imagen-perfil-left iub-border-shadow"/>
    </div>
    <div class="iub-float-left">
      <a href="#">${name}</a>
      <div name="acciones" class="hide">
        <button type="button" class="btn btn-mini btn-action iub-fon-size-11"><i class="icon-envelope"></i> Invitar</button>
      </div>
    </div>
  </div>
</script>