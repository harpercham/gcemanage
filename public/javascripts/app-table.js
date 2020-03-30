
$('table.button').click(function () {
    var i = ((this.id).split(/(\d+)/))[1];
    var action = ((this.id).split(/(\d+)/))[0];

    var password = prompt("Please enter password");

    if (password !== '69570113') {
        alert('Action: failed/cancelled');
    }
    else {
        alert(action.concat(' successfully'));
        $("#action".concat(i))[0].innerText = action;
        if (action == 'approved') { $("#action".concat(i))[0].style.color = "#008000"; }
        if (action == 'rejected') { $("#action".concat(i))[0].style.color = "#FF0000"; }
        $.ajax({
            type: "POST",
            url: '/'.concat(action),
            data: i
        });
    }
});


$('.pdf').click(function () {

    var i = ((this.id).split(/(\d+)/))[1];
    var name = $("#name".concat(i))[0].innerText;
    var wp = $("#wp".concat(i))[0].innerText;
    var hp = $("#hp".concat(i))[0].innerText;
    var date = $("#date".concat(i))[0].innerText;
    var type = $("#type".concat(i))[0].innerText;
    var from = $("#from".concat(i))[0].innerText;
    var to = $("#to".concat(i))[0].innerText;
    var reason = $("#reason".concat(i))[0].innerText;
    var action = $("#action".concat(i))[0].innerText;
    var sign = $("#title".concat(i))[0].lang;
    var bosSign = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAe8AAAEGCAIAAADDoIrQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAABsISURBVHhe7d3Neeu4soXhk5TjcBJOwSE4AkegAByA555r3GONPdW07+rN2rqSwAJBAiQB8HsH5zm9Rf3wb7FQhOT//QsAaB9pDgA9IM0BoAekOQD0gDQHgB6Q5gDQA9IcAHpAmgNAD0hzAOgBaQ4APSDNAaAHpDkA9IA0B4AekOYA0APSHAB6QJoDQA9IcwDoAWkOAD0gzQGgB6Q5APSANAeAHpDmANAD0hwAekCaA0APSHMA6AFpDgA9IM0BoAekOQD0gDQHgB6Q5gDQA9IcAHpAmgNAD0hzAOgBaQ4APSDNAaAHpDkA9IA0B4AekOYA0APSHAB6QJoDQA9IcwDoAWkOAD0gzQGgB6Q50KHr9fr9/f3+/v7x8fHz82P/iq6R5kBv/vnnn5eXl//d+fz8tMfQL9Ic6IpKcovwR1To3SPNgX6oBrfwDry/v9tC6BRpDvTger2+vb1Zco8hzbtHmgPNu1wuT43yEK3z7pHmQNvO5/NklIsS356ATpHmQMN+fn4srX3KeiW+PQH9Is2BVp1OJwts39vbG1X5QZDmQJMi01duPj4+rterPQG9I82Bxiig39/fLbB9X19f9gQcA2kOtGRyJqK8vLzwXaEDIs2BZiRGOY3yYyLNgTYoo19fXy2zHcr6399fewIOhjQHGpDy/SBFOfc8j4w0B2qXEuWfn59E+cGR5kDVEqPclsaBkeZAvVKi/HQ62dI4NtIcqFRKlDMTETekOVAjohxzkeZAdYhyLECaA3UhyrEMaQ5U5Hq9EuVYhjQHapHyxX2iHB7SHKgCUY5MpDmwP6Ic+UhzYH+Tf3qCKMck0hzYGVGOIkhzYE/f39+W2Q6iHIlIc2A3SmrLbAd/DQ7pSHNgH5fLxTLbwS8jYhbSHNjB5Bc+iXLMRZoDW5ucj/j+/m6LAslIc2Br8SjXo4p7WxRIRpoDm4rPR3x9fSXKsQxpDmwnPonl5eXlcrnYosBMpDmwkX/++cdi26EFbFFgPtIc2MLv7298EgvfEkIm0hxY3eQkFv5Sc5cul4uu4vYf6yPNgdXF73x+fHzYcujF19fXbSj2/v6+ze0Q0hxYV/zOZzgfUf/5zx/n81mhMFDiKxRu7MlL6U3thf6w9/j60kcd3nrLirI/2pK2of9Ssm+wSUlzYEWTX99XTJ9OpyFV7Z9qMuS+xha3rCfoJ43eINmgmUaaA2tRlf36+mpnc190EWJe/Chd8GwbPdJF0ZZYDWkOlDT0SVTJqp7tNcoHqkDP57OtNv7yRmOkOVC739/focGt0zU+B7FLumhRpD8ZvYp/f3/bw6shzYElVIIpyA4Y3yGF1zZzNlqhrfF0YLy9vdljayLNgRlUh6rI6ruFsswGtWdDNGLTxV7DNdlsy5DmQJLz+fzx8WHRVSXVg0N83Gx81eHW6L5IcyBGRdbX19eWsXgLZYWj3nqga8l/88D/yJ8jONyqvVHxOLzLrZxcvL50XXZEmgPj1i7Gh9wcYnRI1QoL2+GDDXGvrZFyn0DL8JszuyDNgQfrFeN62aHEtndqkK43ugLZ+kRpZe052AppDhjl7HrFeE83CbUutlZRn/xp022R5ji6/Gkqeq6SS9Wo/XdA9ay9WS8ul0v8VyEH4a/QYD2kOY5rmEaW0gsepSfq6bebfirt7YFHWqzLRNNKafVtJX0E+mZIcxzRz89PYv93lJ6rV3gKKa82/+j6B2+1HWw9fbqeMdFlA6Q5DkT5m3OHU6l0Op28CYJez737+4HhVx9DBPoGSHMcgqIkp6kyFOP2Wg7vItH0JJZEukxOttEJ9LWR5ujc+Xxe3FSJF+P3FGf2nMBBusZazck2OoG+KtIcfVK45MxUSSnG73m3QPUBbIljINB3RJqjNzkzVfQsPXdB3HhTsPu+BTpq8r4ogb4S0hz9UIG8uKmiIlqJvLgr4tWkx/xK5GSga2sfpAG1JdIczVMuKD4WN1VUPuffqPSuIuej/nWeyUBnHnpxpDka9vv7ezqdFjdVEu9wpvA+w5FbCpOBrkugLYoSSHM0SdX04t9UURWvoClYGOql7KUDtsRRTQb6J7/lUg5pjpZkNlVUDK4x+9ub0PK2yd8Pq9xkoGsBWxR5SHO0IbOpohqwVFMl5AUWnYTBZKCvcYk9INIctcv5qxGZM1USeb/QcswJLaO8GZwDXW65I5qPNEeldHpnfv1ns/kk3vREfX5bAlNfLKIrlY80R3Uuf35Txc7y+VZtqozypifSQHgSH2OdTidbDouQ5qjFcIdz8sebPKriv76+dhmwewMIvvH4RHsnvn+5/uUgzbG/oRhfdodTVBrvOy/CPkfAHsYdDZsiO5oGeg4OuANR4aPBrLJvsHsdlFmMi64Bu9e/Wgv7NAFbAo/O57NtoDEH/GWbUjjgDkHBPRqaCvddSiF9npzO+I5NlZDWxT7WI10vbQkEvFlAg8P+HEIm0rx/8TNHybhZka5Rtj7M4mkqoojct6kSIs2X0faxLRWg37IMad65xBJYw9v15oHozPz+/s7pqOj03n6mSiJvJrU+sC1R2jCyURpqaLXZlbi4eAOd+S0LkOZl6NDUeTVqx8auTgk7ORLo1CrbvtBLqY5e/MWfgQp5vUjNlZo39NG/2xKFDBfFcGRT22AlXbyBrnPHlkMa0jyXzqXImDFOZ6aeO1C1pfNfdIjrOM6vQ+OnSoQ+Sc4VqEiIiz5GE+ezdpl94kf6d1sim3altoa97pg6Ry0pIseJBnO2ENKQ5gsps3S65rSAU+iAVtAPET8rYePD2BRaNZX2et/EulgfL7OdMtD76nVqLsafeDmbXzJ7xXhIi9lzWqN1jByo7Q47dkGaz6agVLxmZuViQ7hPFq35pfE9BYpeUO+r1NBbD3QeylA2FrmqtVKMP9EesRV4lLMuem68GH+iXWPPbJAi21YjoLNMx5gthymk+Qw6sGadY2tTwipew1G2ssCWGKPk3etSNErlfFvF+JOCaa6NkFiMP9E11V6iTd42lKYvVBsjzZPoNNuxHp80BOIt1iPnhpbUumjJyDLb0MY8nU67f/cnX5E013ZQobDsANM+tVdpllbfViagbRLWKxhFmk9TUFab40+Gat3+I6C1uC+BVdAV6ZDMpdhqvZa856V5Ygbl3EUXPbfdYc29yPwrHTC2EKJI8xiVV7vk3UpGM1Rpss066kqj9+ojeu7Z6gXsYYeyXqO9xVteF2ZlXAcjmxsdGJGaifI8BWk+TkfPghuJKpQi9i3w9QFs3cYoZ/Ono4zqNcRvbD0D9nBg7h3OJ9pNvW5PXd5sJQOU5ylI8xFzWytaWAfigvJB56TO7YHeVC8iQ/TbS5ejt7B39anW04C3SKnefYjf2AoH7OE72iCL92x/xfioyLFHeT6JNH+gs2VWiaqDTym8UmYNWa/X12mcXzinpPmNtoPeV4k866qmrTFMUbdXOQZb+YA9/PcW+uJrZMfFeEhraqsd0Da0heAgzf+fDhc7cBLo5NSRZ8/cihJ5KN7tQ8y07AOrJhreV5Tvf0YO/xniSXGvf1T0H7Z0GrZtSA9pm+hKPOuKeHOQYjzkXfa0QQ5ySVuMNP+Pzrr04ldHlXLNnrkTHdYqgecmhRY+YDqszTZuQHvH/t9MirP1Bnz1i5Tn2iy2EMaQ5v8dPemZqByv7TTT51elbJ9vipKCAqcs27IlaJQzqyHWK+981NFrS2DModNcuabzx46UKUrMmpsJSgH7oFO0IvYclGCbNcMw2jtsqyqkrWGbJnC0uzKzHDfNL5eL16F7osXqP4Yi49PQ7p2intg2XWS4w2kvhL9UZnnlucovWwiBg6Z5enfltNPfWptrbpeWEX0+HRiRKjKOpkpc5HhmEOM5YponBp/qpobuGSaOM250MaOBvtiQ44kFwT09RfUBeTRJm8g2WYB7oZ5jpblOwsS5K231IrRe9rnnoIG+wOIc1+X2yDNVFvDu7XMv1HOgNE9slGuZ5obA3i1QrUt8IEIDPd3iHFcq0RxfIHIriIm2o46S5ufzOeU8/Pj4aLF6UsrYCjwabhnFhyOcGJNycpzm+GLa7N42P/E3oMccIs0T53u0W0B58yyH0vs3+lflVL8z/PcsznHhMpnPG1nSbBnVf5p7des9HRxNn3te9X0rDDU0sX8aQ6UTysnxAVV5vshxy8Uy1Hmap0xf0XC49eLU1iRwv16KbPvXMUTPTX6OD9ikRdBsSddzmqdEeR/HhK1MwB7+K9JAp98y+Cn3tztI8yK8s1gHsy2Bv7pN85Qo72amga1PwB7+S4NTe2DMwYsdDern5rjKRlXx3k2Lbo6ufUWaLUzbf9JhmqvG9E6wG52HPfXdbK0C9vCdb/+vhsoxy0mttTe12aPcV1gPoxnvxoz+fXh9ZPKaLYx+nvSW5jrBJr8fpAU6u4ViKxawhx9Fkutoo1cVd5MX/idKlqfvIpLma/OOWNL8SW9pPllkKbD6axDbugXs4UfxCYsHySAdA14Ke4a+SnjwqEi3JR598qcsCyHNE3WV5pO98i6jXGz1AvZwINJvUWZ1347U6keuZyEvxwfKFFvukTLIlkAeL83pmz/pJ80no7zjWsnWMGAPj4kMYjqOISXvZCPuXjzHB16aH61ttR7boAF7GH91skWOHOViKxmwh8fE57f0N4Zd0CLXMZM4krMnBOxh5LGtGbCH8VcPW2SyAdp3lIutZ8AedkS222tf35zWms5qreiAmTWKt6cFumzrbc+2ZsAexl/NbxHvHtRN91EutqoBe9gXmWGtBLSFWqZBxqxZ5O+LfifL6970N8TZnjeI7KzgKKLtNI///IgcIcrF1jZgD/u8nq+omG26tNSHn9VaUTrocLInz+TdhOALRPm8Q7TjuzuLNZzmumjHh88HiXKxFQ7Yw1GRyGv326GzZq1oyacp5HN5Pas+xjf78uZf6bi1JfBXq2muyit+uh7q0m3rHLCHo379P9klzU0C0zXeq5RH6YqVPwQhcdbDlTJdk2mu0y8+z6zXeeUeW+2APTzFO2GkrfFNZEVCCv1S1yqvG8AkxXzetTlzONWlJtM8ftIeLcrF1jxgD0+JD3Sa+BUEfcj4Bf5eTot8VGR8Y0tgKe8mNneYQ+0dbfHo0UNNpE9ZtvIBezhBZGpQ5T0rHQ+n6E+3P1EpsMbF3l49cMCjsSDtKduOgTV2YuvaS3OvRynHjHLxRqP2cJrITL5q6yB9sMjHflKwtRLydgHTWnJ4LSztdFsCd9pL88jZe9gzp0iaN1eep3fJdZkv21oJeeODg/9qfCZvF3N7eVRjaR5JHO14W+h4iqS5eK8jVZXns7rkRWatTPKGjHVeCFvhHZBHPtkjGktzb++q+DpyH61UmnsDW6mnGkovyZX4m12EIpvOlsB8tgUDVdUW9WjpUIvMHDj4eNZL8wVXOO+lZPe55/oAkY/3ZPvyzd44wI3QZSLf9LYl8Kil7RKZurB70OzLy7gFJUykxtx37rnO7chcpnsqyXcJUG8vMDN6Ge9813a2JfCopTT3TmZuiRRMc4nUv7tcNTXCiFzIn+zYUfU+JMfnMt58B5rmnmbSPDLsoolWNs0jm3r7jlb6Dc+9SvIbb7sxnW4B7UrbfAE6V55m0lwFju3MR5wqUjbNxSuLNr7b/PPzk9hdqaFei9zXOXgncAFvoMP5HtFGmitBbGcGGHZJ8TSPzATdZlK/9vjn1N+TGuxekt/zroK0zufyruLbjw4b0kaaR8KFqkeKp7l4wbRBcaR9mthd0bm95VhhkncFonU+S6TXR5sloo0099osOudtiWNbI8016LFXCeS87CSdrindFS2jc96eUw2v7NCntSWQwDueabPENZDmkTbLNqP++q2R5trsXqquV2nqTVOqcq1vVSX5TeRYXfUS2JPI7QfaqnENpHmkzVLnKb29NdJcIp3rlRpcKb3yynvQ3tWIhm+i7Y+6bjSQ5l6bhV7kzUppHpkltkaVFLlsDzTQrr9t6nWo6BKkiAxudJDbQnA0kObeeJ95Ajcrpbl4r1w8m1R2xdvlung3MRSLXAK5gzcpcremwtsktak9zSN3txl23ayX5pF6uezZFW+Xt3Xl1qXOPvcjmi1xulp7V3RGNilqT3PvSwTMZrm3XpqLd4J9lvvZlkhFJs0NwrzOL5EUF+mYM98hRe1p7pU53N2+513ziqS59+JSpPURaU1Ii3dHmC69QGQqC1fBRFWneWQHc1bc82rbIhVNJG2LvH6kx6LTuNFpS96AhmaLxxtfCnfIElWd5l7TVqeKLYE/vDQvNYLxAldnoC2xlE5Ue60xRcYWu/CaBhy6oyKjGQrzdFWnuXdKFOzY9mHtNI9kbs696MhdLyn14Xeh65CtRoCj94kOA6+hKnTM01Wd5t6pzg5+snaa63yzVwzkjIIjd706uMsdSSgC/V7kxgyTHWapN80j7VrmJj5ZO83F+w7X4vMtUr1KB/dFIiElCvRGbwmUFT8M2m217aLeNPdG9/TRQhukuXcPQ5ZdXCN3vfq4VRi5hz/QhfDggR5vtfFl77nqTXNvGM4oNbRBmpdttkQqsnbnsYQiV6yBsuzIs7Mi20dbhrHLXPWmudd2pGke8sYxBdNcCjZbIqdxT/tXeaSNYyvmO+Yh7ZUgg5z7MYdVaZpHRqk0zUNeqVt2HFOq2RIpzPOnPNYmMdBb+RWaUiJTEqW/w2Ablaa5t7Npmo/y8rHsWaG4sdcNzKouvR6adHnXS9stMha50bHd5eqHLtE/SKKHqNiWqTTNvfkA3BgZtU2ai9dsSW/pREZdfVdkkWvYPR35fRfpWjuviToo+2tuh1Jpmnu1DN20UZulef7tVq/FL91XpvFO8Y3CrtdEU5TH+07McchRaZrbvg0cZCg6V0Np7p3MC26ltujn5yfSZLinfddZw2Eyyg9yDKynxjSPfG/IlsCjVtI80mY5zrwOHd7xVsM91ardNF68Nt2Adnm+GvPRmztRPJt6YtvoUfGbxplp7rVZjja5WCsbj7Z72jjavE1vn5T1PfK8+1JqTHPvFmgfXxFciW2jgD1cSGaae6f0MbulurYldl1ES+r4b7F6VZTHGyxynJHZqmpMc9XgtpMfscsjbBsF7OFCMtPcC6/DTmNQOntHu0dXvobuHqVEeeLBg0k1prnt5ABjsQjbRgF7uJCcNI80zZtuI+SbVaQPXl9f9azKt5tO2MkoZxJLQdWleeSctyUwxrZRwB4uJCfNvVu1zGQQHfbpnfR7epbGrBXGunb35CWKKC+ruoj0vgXKOR/nDdjLDmhy0tx7Lqf0jRIwfbrLE8W6qvVKGuve7e577PfiqktzzvllvDQv22NdI81TnnsoqrUXZ7rouafTSVXRLgW73lSnqn0UH6fzGqpLc2+8yTkf126ac3M7pEzU5prbTA8p2ZWbqpTLHgaelEa5EOUrqS7NvaNhm8OxXe2mOXvWo0xXEOfU6U/0UjpOtCOGfC/blknprgjzjNdTXZrbPg9U0hCsljdJX+eYLVHCGmme8tyD0/DFu1rn0whALy4qmbUvBufzWXGfSAsnfjzGYauqK82Z0LKYzkDbUo/077ZECTnvss0n7NjlclHg5rdfdqGPrdy3NcE66kpJ7W/b+Y905bcl4NgmK3PexXvuB79yPMf1elWFu2w6417e3t74ssgG6kpzr/XGCT/Jy8qybcqcNPcu1arabAnMoYGszpf6Y12fcJfZNQdUV5rnhMXBbTOsydlBOqVt6QBj8BxDtV5nE6bsbRvE1ZXm3r0Ubp5Mqj/NxZuewZS1Ui6Xy1CwF5wJswzdle21kebUbpP2TfPEHeRNvBHmLBWnTXo+n7XLdAxsXLZrR9Nd2V5daW7HQoAjI4VtrIA9XELm5VbFmj0hwK2Rtekk0m7SMFf5rq29UsRrTEDttZc20tweRpRtrIA9XEL+4CnyXUH6abtQCa/dJ0PQDz4/P7WvE6kSH571Xf3POvatoqDU8WSn9SOd/7YEomx7BQqeYDp17UUfad/ZElMUGfacgEpFOq3AYg2kuRLElkBUftROKvIWkRt0CnSKO2CZitLcq9qY8JColTT3LtsDDcUIdGCBitL8i8nmeXTZs032qGA/utQFI/6dF1ouwAKkeT822IDeLAh7OJmq7/iEaL3R+ah/LBRYpqI036BR0DcvzQt+ud9eMWAPz6Hq27s23JT9WQKgb6R5P7x+tDasLZHNXjFgD88Umd9yw1cKgUSkeT+aS3NJCXSh2wZMqijNS/VkD+vq/6yVLZFnpatFYqAztQmIqygr7awN2MNIYJssUGTO33q1f2Kg03IBIkjzrnjfmy/SrTqfz/Zyj4p0cvQJJ2+K8vOqQETtaa4z3B5GAu/eQ5HZfmvPgPz9/Y38iouQ5kBELWmuM9lO2UcF7+AdgfeTs0UCd+00H3jvIvxqLhBRS5pvMB/jCLwoLHILcdXC/54OhrBIZ+45EEead2XVzbhqUz6kK9Pwjvrfgj9OAPSKNO/Kxf9zELZEBnuhAD+SBdSANO+NbbhAZuZ6NzbElgCwK9K8Nyv1Q1adngggH2neG+/HZjP/YOOq91cB5CPNexOZ4SenpX9MXTvCXuIRc8CBSpDmvfFaIjcvLy9K/FmZ/vPz431RM7OBA6AU0rw3kduV95TOn5+fkaniins9qmXiX7i3pQHsjTTvkHcj1KON/PHxoYJ9oP9MfAUtZm8JYG+1pDnf7C9LNbVtwTXx/UygHhWNlC0hHlH9LRZpdpdC0xyoR+1pLvYw5rtcLnO7LrPY2wCoAGnev+/v7+JF+vv7O4U5UJWKsvL19dWi4hF/cSbf9Xr9+voqkukfHx/kOFChitJc5Z4FxiOyoxRluup076oZp2fpesAvjAPVqijNva+k823D4jTcGWYi2iZ2qJbXMtr+DI+A+lWU5soXS5FHTINblcptjX7O57O2/0D/Kct+AADAXipKc9WAlt+PmHIOAJMqSnPVg5bfAVsCAOCoKygtvAP0bQEgrq40977q8lX0r8IDQH/qSnPv10X4fj8AxNWV5pHf5qbZAgARdaX59Xq18A7wF8sAIKKuNJfIT7n+/PzYQgCAR9WleWSeotBvAYBR1aW5RL5xTr8FAEbVmOaR8pzvhQLAqBrTXLxf4CLNAWBUpWl+vV5Hf7iVrxEBwKhK01wul8vTX1d4e3vjh/0AYFS9aS6/v7+n0+n9D37lHAAiqk5zAEAi0hwAekCaA0APSHMA6AFpDgA9IM0BoAekOQC0799//w9T6Rr2W9ftAgAAAABJRU5ErkJggg=='
    var img = new Image()
    img.src = 'https://raw.githubusercontent.com/harpercham/status/master/images/Form-%20Leave%20Form.png';
    var doc = new jsPDF()
    if (action == 'approved') {
        doc.addImage(img, 'png', 0, 0, 210, 297);
        doc.setFontSize(10);
        doc.text(name + '  ( ' + wp + ' )', 60, 45);
        doc.text(date, 158, 59);
        doc.text(type, 90, 78);
        doc.text(from, 80, 92);
        doc.text(to, 145, 92);
        doc.text(reason, 60, 104);
        doc.text(hp, 60, 124);
        doc.text('Gan Kok Leong', 145, 210);
        doc.addImage(bosSign, 'PNG', 143, 217, 30, 12);
        doc.setFontSize(7);
        doc.addImage(sign, 'PNG', 29.5, 206, 48, 15)

        doc.save('leave form-' + name + '-' + from + '-' + to)

    }
    else if (action == 'rejected') {
        alert('The application has been rejected')
    }
    else (alert('The application has not been approved'))

});
