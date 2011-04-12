// PLUGIN: Wolfram Alpha
// Lsblakk AppID P7WL8Y-UT9W975T4T
(function (Popcorn) {
  
  /**
   * WolframAlpha popcorn plug-in 
   * Appends a users search results WolframAlpha image or html to an element on the page.
   * Options parameter will need a start, end, target, search input string, and api_key.
   * Optional parameters are ###
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   *  an api_key is required
   * Api_key is your own api key provided by WolframAlpha Developer Portal
   * Target is the id of the document element that the images are
   *  appended to, this target element must exist on the DOM
   * 
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#video')
        .footnote({
          start:          5,                 // seconds, mandatory
          end:            15,                // seconds, mandatory
          appid:         'P7WL8Y-UT9W975T4T', // mandatory
          searchinput:           'dogs,cats',       // optional
          target:         'wolframalphadiv'        // mandatory
        } )
   *
   */
  Popcorn.plugin( "wolframalpha" , function( options ) {
    // per track variables
    var containerDiv,
        _uri,
        _searchinput,
        i;

    // create a new div this way anything in the target div is left intact
    // this is later populated with WolframAlpha images
    containerDiv               = document.createElement( "div" );
    containerDiv.id            = "WolframAlpha"+ i;
    containerDiv.style.width   = "100%";
    containerDiv.style.height  = "100%";
    containerDiv.style.display = "none";
    i++;
    
    // ensure the target container the user chose exists
    if ( document.getElementById( options.target ) ) {
      document.getElementById( options.target ).appendChild( containerDiv );
    } else { 
      throw ( "WolframAlpha target container doesn't exist" ); 
    }
    
    // get the XML from WolframAlpha API by using the appid and searchinput
    var getWolframAlphaData = function() { 
        _uri  = "http://api.wolframalpha.com/v2/query?";  
        _uri += "input=" + options.searchinput + "&appid=" + options.appid;
        console.log(_uri);
      Popcorn.xhr({
          url: _uri,
          success: function( data ){
            console.log(data);
          }});
    };
    
    if ( options.searchinput ) {
      _searchinput = options.searchinput;
      getWolframAlphaData();
    }
    return {
      /**
       * @member WolframAlpha
       * The start function will be executed when the currentTime
       * of the video reaches the start time provided by the
       * options variable
       */
      start: function( event, options ){
        containerDiv.style.display = "inline";
      },
      /**
       * @member WolframAlpha
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function( event, options ){      
          containerDiv.style.display = "none";       
      }
    };
  },
  {
    about:{
      name:    "Popcorn WolframAlpha Plugin",
      version: "0.1",
      author:  "Lukas Blakk, Annasob",
      website: "http://lukasblakk.com/"
    },
    options:{
      start          : {elem:'input', type:'number', label:'In'},
      end            : {elem:'input', type:'number', label:'Out'},
      appid        : {elem:'input', type:'text',   label:'AppID'},
      searchinput : {elem:'input', type:'text', label:'Search Input'},
      target         :  'WolframAlpha-container'
    }
  });
})( Popcorn );
