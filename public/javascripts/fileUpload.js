FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  
  FilePond.setOptions({
    stylePanelAspectRatio: 350 / 350,
    imageResizeTargetWidth: 350,
    imageResizeTargetHeight: 350
  })
  
  FilePond.parse(document.body);