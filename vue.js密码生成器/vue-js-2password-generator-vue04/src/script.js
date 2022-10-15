new Vue ({
    el: '#app',
    data: function() {
      return {
        generateText: "G",
        copyText: "c",
        characters: [
          {
              name: "Lowercase",
              value: "abcdefghijklmnopqrstuvwxyz",
              checked: false,
          },
          {
              name: "Uppercase",
              value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              checked: true,
          },
          {
              name: "Numbers",
              value: "0123456789",
              checked: true,
          },
          {
              name: "Special Characters",
              value: "_-+=)(*&^%$#@!`~",
              checked: false,
          },
        ],
        password: "",
        gLength: 9,
      }
    },
    methods: {
      onMouseEnterGenerateBtn: function() {
        this.generateText = "Generate";
      },
      onMouseLeaveGenerateBtn: function() {
        this.generateText = "G";
      },
      onMouseEnterCopyBtn: function() {
        this.copyText = "copy";
      },
      onMouseLeaveCopyBtn: function() {
        this.copyText = "c";
      },
      onGenerate: function() {
          let result = "";
          let charactersVal = "";
          for (var j = 0; j < this.characters.length; j++) {
            if (this.characters[j].checked) {
              charactersVal += this.characters[j].value;
            }
          }
          for ( var i = 0; i < this.gLength; i++ ) {
            result += charactersVal.charAt(Math.floor(Math.random() * charactersVal.length));
          }
          this.password = result;
        },
        onCopyPass: function() {
            let textToCopy = this.password;
            try {
                // 1) Copy text
                navigator.clipboard.writeText(textToCopy);

                // 2) Catch errors
              } catch (err) {
                console.error('Failed to copy: ', err);
              }
        }
    },
});