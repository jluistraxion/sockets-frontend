var var_objetojsonAPI = {
  TipoDoc: '?',
  Datos: {
    ApellidoPaterno: '?',
    ApellidoMaterno: '?',
    Nombre: '?',
    Nombre1: '?',
    Nombre2: '?',
    Calle: '?',
    Colonia: '?',
    CP: '?',
    Delegacion: '?',
    Estado: '?',
    Municipio: '?',
    ClaveElector: '?',
    Curp: '?',
    FechaNacimiento: '?',
    Sexo: '?',
    EstadoNacimiento: '?',
    AnoRegistro: '?',
    AnoEmision: '?',
    Vigencia: '?',
    NumeroEmision: '?',
    Seccion: '?',
    Localidad: '?',
    Negocio: '?'
  },
  DatosMRZ: {
    Folio: '?',
    CIC: '?',
    VigenciaMRZ: '?',
    NumeroEmisionMRZ: '?',
    NacionalidadMRZ: '?',
    FechaNacimientoMrz: '?',
    SexoMrz: '?',
    TipoIdentificacionReverso: '?',
    rawMRZString: '?'
  },
  Otros: {
    InformacionCentral: '?',
    FolioCentral: '?'
  },
  ImagenesBase64: {
    FrenteDoc: '?',
    ReversoDoc: '?',
    FotografiaDoc: '?'
  }
}

const faceImageEl = document.createElement('canvas')
var var_tamcadenapostal = 0
var var_tipocadenapostal = 0
var jsonSalidaCliente2 = JSON.stringify(var_objetojsonAPI)
var jsonObject2 = JSON.parse(jsonSalidaCliente2)

function fnObtieneCuatroDigitosSecc(folioINE) {
  let secc = '?'
  folioINE = folioINE.replace(/[^0-9]+/g, '')
  if (folioINE === '' || folioINE == null || folioINE === 'Undefinied') {
    folioINE = '?'
  }
  let tam = folioINE.length
  if (tam >= 4) {
    secc = folioINE.substr(0, 4)
  } else {
    secc = '?'
  }
  return secc
}

function fnValidaNacionalidadDiccionario(nacion) {
  var dicNacionalidad = {
    MEX: 'MEXICO',
    D: 'ALEMANIA',
    'D<<': 'ALEMANIA',
    ARG: 'ARGENTINA',
    BEL: 'BELGICA',
    BLZ: 'BELICE',
    BRA: 'BRASIL',
    CAN: 'CANADA',
    CHL: 'CHILE',
    CHN: 'CHINA',
    COL: 'COLOMBIA',
    CRI: 'COSTA RICA',
    CUB: 'CUBA',
    ECU: 'ECUADOR',
    SLV: 'EL SALVADOR',
    ESP: 'ESPAÑA',
    PHL: 'FILIPINAS',
    FRA: 'FRANCIA',
    GHA: 'GHANA',
    GTM: 'GUATEMALA',
    HND: 'HONDURAS',
    HUN: 'HUNGRIA',
    IND: 'INDIA',
    IRL: 'IRLANDA',
    ISR: 'ISRAEL',
    ITA: 'ITALIA',
    JAM: 'JAMAICA',
    LTU: 'LITUANIA',
    NIC: 'NICARAGUA',
    NLD: 'PAISES BAJOS',
    PAN: 'PANAMA',
    PRY: 'PARAGUAY',
    PER: 'PERU',
    POL: 'POLONIA',
    CZE: 'REPUBLICA CHECA',
    DOM: 'REPUBLICA DOMINICANA',
    ROU: 'RUMANIA',
    LKA: 'SRI LANKA',
    SWE: 'SUECIA',
    GBR: 'REINO UNIDO',
    URY: 'URUGUAY',
    USA: 'ESTADOS UNIDOS',
    UZB: 'UZBEKISTAN',
    VEN: 'VENEZUELA',
    UKR: 'UCRANIA',
    AUS: 'AUSTRALIA',
    BGR: 'BULGARIA',
    AUT: 'AUSTRIA',
    BLR: 'BIELORRUSIA',
    BOL: 'BOLIVIA',
    CHE: 'SUIZA',
    BHS: 'BAHAMAS',
    EST: 'ESTONIA',
    FIN: 'FINLANDIA',
    HTI: 'HAITI',
    HT: 'HAITI',
    HRV: 'CROACIA',
    JPN: 'JAPON',
    KOR: 'COREA DEL SUR',
    LUX: 'LUXEMBURGO',
    PRT: 'PORTUGAL',
    RUS: 'RUSIA',
    SRB: 'SERBIA',
    SVK: 'ESLOVAQUIA',
    SVN: 'ESLOVENIA',
    ARM: 'ARMENIA',
    THA: 'TAILANDIA',
    TUN: 'TUNEZ',
    TUR: 'TURQUIA',
    TWN: 'TAIWAN',
    VNM: 'VIETNAM',
    IDN: 'INDONESIA',
    MAR: 'MARRUECOS',
    KGZ: 'KIRGUISTAN',
    JOR: 'JORDANIA',
    LBN: 'LIBANO',
    ARE: 'EMIRATOS ARABES UNIDOS',
    AFG: 'AFGANISTAN',
    ALA: 'ISLAS ALAND',
    ALB: 'ALBANIA',
    DZA: 'ARGELIA',
    ASM: 'SAMOA AMERICANA',
    AND: 'ANDORRA',
    AGO: 'ANGOLA',
    AIA: 'ANGUILA',
    ATA: 'ANTARTIDA',
    ATG: 'ANTIGUA Y BARBUDA ',
    ABW: 'ARUBA',
    AZE: 'ASERBAIYAN',
    BHR: 'BAHREIN',
    BGD: 'BANGLADESH',
    BRB: 'BARBADOS',
    BEN: 'BENIN',
    BMU: 'ISLAS BERMUDAS',
    BTN: 'BUTAN',
    BES: 'BONAIRE',
    BIH: 'BOSNIA Y HERZEGOVINA',
    BWA: 'BOTSUANA',
    BVT: 'ISLA BOUVET',
    IOT: 'TERRITORIO BRITANICO DEL OCEANO INDICO',
    BRN: 'BRUNEI DARUSSALAM',
    BFA: 'BURKINA FASO',
    BDI: 'BURUNDI',
    CPV: 'CABO VERDE',
    KHM: 'CAMBOYA',
    CMR: 'CAMERUN',
    CYM: 'ISLAS CAIMAN',
    CAF: 'REPUBLICA CENTROAFRICANA',
    TCD: 'CHAD',
    CXR: 'ISLA DE NAVIDAD',
    CCK: 'ISLAS COCOS',
    COM: 'COMORAS',
    COG: 'CONGO',
    COD: 'REPUBLICA DEMOCRATICA DEL CONGO',
    COK: 'ISLAS COOK',
    CIV: 'COSTA DE MARFIL',
    CUW: 'CURAZAO',
    CYP: 'CHIPRE',
    DNK: 'DINAMARCA',
    DJI: 'DJIBOUTI',
    DMA: 'DOMINICA',
    EGY: 'EGIPTO',
    GNQ: 'GUINEA ECUATORIAL',
    ERI: 'ERITREA',
    ETH: 'ETIOPIA',
    FLK: 'ISLAS MALVINA',
    FRO: 'ISLAS FEROE',
    FJI: 'FIYI',
    GUF: 'GUAYANA FRANCESA',
    PYF: 'POLINESIA FRANCESA',
    ATF: 'TIERRAS AUSTRALES Y ANTARTICOS FRANCESES',
    GAB: 'GABON',
    GMB: 'GAMBIA',
    GEO: 'GEORGIA',
    GIB: 'GIBRALTAR',
    GRC: 'GRECIA',
    GRL: 'GROENLANDIA',
    GRD: 'GRANADA',
    GLP: 'GUADALUPE',
    GUM: 'GUAM',
    GGY: 'BAILIA DE GUERNSEY',
    GIN: 'GUINEA',
    GNB: 'GUINEA-BISAU',
    GUY: 'GUAYANA',
    HMD: 'ISLAS HEARD Y MCDONALD',
    VAT: 'CIUDAD DEL VATICANO',
    HNK: 'HONG KONG',
    ISL: 'ISLANDIA',
    IRN: 'IRAN',
    IRQ: 'IRAK',
    IMN: 'ISLA DE MAN',
    JEY: 'JERSEY',
    KAZ: 'KAZAJISTAN',
    KEN: 'KENIA',
    KIR: 'KIRIBATI',
    PRK: 'COREA DEL NORTE',
    KWT: 'KUWAIT',
    LAO: 'LAOS',
    LVA: 'LETONIA',
    LSO: 'LESOTO',
    LBR: 'LIBERIA',
    LBY: 'LIBIA',
    LIE: 'LIECHTENSTEIN',
    MAC: 'MACAO',
    MKD: 'MACEDONIA',
    MDG: 'MADAGASCAR',
    MWI: 'MALAUI',
    MYS: 'MALASIA',
    MDV: 'MALDIVAS',
    MLI: 'MALI',
    MLT: 'MALTA',
    MHL: 'ISLAS MARSHALL',
    MTQ: 'MARTINICA',
    MRT: 'MAURITANIA',
    MUS: 'MAURICIO',
    MYT: 'MAYOTTE',
    FSM: 'ESTADOS FEDERADOS DE MICRONESIA',
    MDA: 'MOLDAVIA',
    MCO: 'MONACO',
    MNG: 'MONGOLIA',
    MNE: 'MONTENEGRO',
    MSR: 'MONTSERRAT',
    MOZ: 'MOZAMBIQUE',
    MMR: 'MYANMAR',
    NAM: 'NAMIBIA',
    NPL: 'NEPAL',
    ANT: 'ANTILLAS NEERLANDESAS',
    NTZ: 'ZONA NEUTRAL',
    NCL: 'NUEVA CALEDONIA',
    NZL: 'NUEVA ZELANDA',
    NER: 'NIGER',
    NGA: 'NIGERIA',
    NIU: 'NIUE',
    NFK: 'ISLA NORFOLK',
    MNP: 'ISLAS MARIANAS DEL NORTE',
    NOR: 'NORUEGA',
    OMN: 'OMAN',
    PAK: 'PAKISTAN',
    PLW: 'PALAU',
    PSE: 'PALESTINA',
    ' PNG': 'PAPUA NUEA GUINEA',
    PCN: 'ISLAS PITCAIRN',
    PRI: 'PUERTO RICO',
    QAT: 'CATAR',
    REU: 'ISLA REUNION',
    RWA: 'RUANDA',
    BLM: 'SAN BARTOLOME',
    SHN: 'SANTA ELENA, ASCENSION Y TRISTAN DE ACUÑA',
    KNA: 'SAN CRISTOBAL Y NIEVES',
    LCA: 'SANTA LUCIA',
    MAF: 'ISLA DE SAN MARTIN (FRANCIA)',
    SPM: 'SAN PEDRO Y MIQUELON',
    VCT: 'SAN VICENTE Y LAS GRANADINAS',
    WSM: 'SAMOA',
    SMR: 'SAN MARINO',
    STP: 'SANTO TOME Y PRINCIPE',
    SAU: 'ARABIA SAUDITA',
    SEN: 'SENEGAL',
    SYC: 'SEYCHELLES',
    SLE: 'SIERRA LEONA',
    SGP: 'SINGAPUR',
    SXM: 'ISLA DE SAN MARTIN (HOLANDA)',
    SLB: 'ISLAS SALOMON',
    SOM: 'SOMALIA',
    ZAF: 'SUDAFRICA',
    SGS: 'ISLAS GEORGIA Y SANDWICH DEL SUR',
    SSD: 'SUDAN DEL SUR',
    SDN: 'SUDAN',
    SUR: 'SURINAM',
    SJM: 'SVALBARD Y JAN MAYEN',
    SWZ: 'SWAZILANDIA',
    SYR: 'SIRIA',
    TJK: 'TAYIKISTAN',
    TZA: 'TANZANIA',
    TLS: 'TIMOR ORIENTAL',
    TGO: 'TOGO',
    TKL: 'TOKELAU',
    TON: 'TONGA',
    TTO: 'TRINIDAD Y TOBAGO',
    TKM: 'TURKMENISTAN',
    TCA: 'ISLAS TURCAS Y CAICOS',
    TUV: 'TUVALU',
    UGA: 'UGANDA',
    UMI: 'ISLAS ULTRAMARINAS MENORES DE LOS ESTADOS UNIDOS',
    VUT: 'VANUATU',
    VGB: 'ISLAS VIRGENES BRITANICAS',
    VIR: 'ISLAS VIRGENES DE ESTADOS UNIDOS',
    WLF: 'WALLIS Y FUTUNA',
    ESH: 'SAHARA OCCIDENTAL',
    YEM: 'YEMEN',
    ZMB: 'ZAMBIA',
    ZWE: 'ZIMBABUE'
  }

  let existe = 0
  var resultna = ''
  for (var clave in dicNacionalidad) {
    if (dicNacionalidad.hasOwnProperty(clave)) {
      if (clave === nacion) {
        existe = 1
        resultna = dicNacionalidad[clave]
      }
    }
  }
  if (existe === 1) {
    return resultna
  } else {
    return nacion
  }
}

function fnValidaEstructuraMrz(numero) {
  let aux = '?'
  if (numero === '' || numero == null || numero === 'Undefinied' || numero.length < 2) {
    aux = '?'
  } else {
    aux = numero.substr(0, 2)
  }
  return aux
}

function fnValidaEstructuraCuatroDigitos(fecharegistro) {
  let d1 = '?'
  if (
    fecharegistro == null ||
    fecharegistro === '' ||
    fecharegistro === ' ' ||
    fecharegistro === '?'
  ) {
    d1 = '?'
  } else {
    let tam2 = fecharegistro.length
    if (tam2 >= 4) {
      d1 = fecharegistro.substr(0, 4)
    } else {
      d1 = '?'
    }
  }
  return d1
}

function fnObtieneDosDigitosEmision(fecharegistro) {
  let d1 = ''
  if (
    fecharegistro == null ||
    fecharegistro === '' ||
    fecharegistro === ' ' ||
    fecharegistro === '?'
  ) {
    d1 = '?'
  } else {
    let tam = fecharegistro.length
    d1 = '?'
    if (tam >= 4) {
      d1 = fecharegistro.substr(tam - 2, 2)
      let l1 = d1.substr(0, 1)
      let l2 = d1.substr(1, 1)
      if (l1 === 'o' || l1 === 'O') {
        l1 = '0'
      }
      if (l2 === 'o' || l2 === 'O') {
        l2 = '0'
      }
      d1 = l1 + l2
      if (fnValidaEsLetra(String(l1))) {
        d1 = '?'
      }
      if (fnValidaEsLetra(String(l2))) {
        d1 = '?'
      }
    }
  }
  return d1
}

function fnValidaEsLetra(letra) {
  return letra.length === 1 && letra.match(/[a-z]/i)
}

function fnValidaConvierteDosDigitos(valorfecha) {
  var letra = valorfecha.toString()
  if (valorfecha === '' || valorfecha == null || valorfecha === 'Undefinied') {
    valorfecha = '?'
  } else {
    var cero = '0'
    let tam = 1
    if (letra.length === tam) {
      letra = cero + letra
    }
  }
  return letra
}

function fnValidaEstructuraFecha(fechaw) {
  var ad = '/19'
  var tn = fechaw.length
  var resut
  if (fechaw === '' || fechaw == null || fechaw === ' ' || fechaw === undefined) {
    fechaw = '?'
  } else {
    if (tn === 6) {
      let an = fechaw.substr(0, 2)
      if (an === '00') {
        ad = '/20'
      }
      let me = fechaw.substr(2, 2)
      let di = fechaw.substr(4, 4)
      resut = di + '/' + me + ad + an
    } else if (tn === 10) {
      resut = fechaw
    } else {
      resut = '?'
    }
  }
  return resut
}

function getEstRenapo(curpXX) {
  let estadoRenapo = [
    '?',
    'AS',
    'BC',
    'BS',
    'CC',
    'CL',
    'CM',
    'CS',
    'CH',
    'DF',
    'DG',
    'GT',
    'GR',
    'HG',
    'JC',
    'MC',
    'MN',
    'MS',
    'NT',
    'NL',
    'OC',
    'PL',
    'QT',
    'QR',
    'SP',
    'SL',
    'SR',
    'TC',
    'TS',
    'TL',
    'VZ',
    'YN',
    'ZS',
    'NE'
  ]
  let estadosArray = [
    '?',
    'AGUASCALIENTES',
    'BAJA CALIFORNIA',
    'BAJA CALIFORNIA SUR',
    'CAMPECHE',
    'COAHUILA',
    'COLIMA',
    'CHIAPAS',
    'CHIHUAHUA',
    'DISTRITO FEDERAL',
    'DURANGO',
    'GUANAJUATO',
    'GUERRERO',
    'HIDALGO',
    'JALISCO',
    'MEXICO',
    'MICHOACAN',
    'MORELOS',
    'NAYARIT',
    'NUEVO LEON',
    'OAXACA',
    'PUEBLA',
    'QUERETARO',
    'QUINTANA ROO',
    'SAN LUIS POTOSI',
    'SINALOA',
    'SONORA',
    'TABASCO',
    'TAMAULIPAS',
    'TLAXCALA',
    'VERACRUZ',
    'YUCATAN',
    'ZACATECAS'
  ]
  let variable = curpXX.substr(11, 2)
  let site = estadoRenapo.indexOf(variable)
  return estadosArray[site]
}

function fnValidaDiccionarioRemplazoNombre(valornombre) {
  var dicdatos = {
    NUNEZ: 'NUÑEZ',
    BRICENO: 'BRICEÑO',
    MUNOZ: 'MUÑOZ',
    ÑUNEZ: 'ÑUÑEZ',
    NACUL: 'ÑACUL',
    NACULEO: 'ÑACULEO',
    NAHUEN: 'ÑAHUEN',
    NACULIPE: 'ÑACULIPE',
    NACUMAN: 'ÑACUMAN',
    NACUPICHUN: 'ÑACUPICHUN',
    NAHUELEN: 'ÑAHUELEN',
    NAHUEY: 'ÑAHUEY',
    NAICUL: 'ÑAICUL',
    NAICULEN: 'ÑAICULEN',
    NAICULEO: 'ÑAICULEO',
    NAM: 'ÑAM',
    NAMCUL: 'ÑAMCUL',
    NAMCULEF: 'ÑAMCULEF',
    NAMCUVILO: 'ÑAMCUVILO',
    NAMINANCO: 'ÑAMIÑANCO',
    ÑAMINANCO: 'ÑAMIÑANCO',
    NAMIÑANCO: 'ÑAMIÑANCO',
    NAMO: 'ÑAMO',
    NAMPIL: 'ÑAMPIL',
    NAMUNCURA: 'ÑAMUNCURA',
    NANCA: 'ÑANCA',
    NANCACHEO: 'ÑANCACHEO',
    NANCAFIL: 'ÑANCAFIL',
    NANCALAO: 'ÑANCALAO',
    NANCAN: 'ÑANCAN',
    NANCAO: 'ÑANCAO',
    NANCAPICHUN: 'ÑANCAPICHUN',
    NANCAVIL: 'ÑANCAVIL',
    NANCAVILU: 'ÑANCAVILU',
    NANCHUCHEO: 'ÑANCHUCHEO',
    NAHUI: 'ÑAHUI',
    NANEZ: 'NAÑEZ',
    NANCHEO: 'ÑANCHEO',
    ÑANEZ: 'ÑAÑEZ',
    NAUPA: 'ÑAUPA',
    NAUPARI: 'ÑAUPARI',
    NAUPAS: 'ÑAUPAS',
    NOPO: 'ÑOPO',
    NIQUE: 'ÑIQUE',
    NIQUEN: 'ÑIQUEN',
    NUNUVERA: 'ÑUÑUVERA',
    ÑUNUVERA: 'ÑUÑUVERA',
    NUÑUVERA: 'ÑUÑUVERA',
    NAHUIN: 'ÑAHUIN',
    NAHUINCCOPA: 'ÑAHUINCCOPA',
    NAHUINILLA: 'ÑAHUINILLA',
    NAHUINRIPA: 'ÑAHUINRIPA',
    NAHUIS: 'ÑAHUIS',
    NANO: 'ÑAÑO',
    ÑANO: 'ÑAÑO',
    NAÑO: 'ÑAÑO',
    NATO: 'ÑATO',
    NAVINCOPA: 'ÑAVINCOPA',
    NIGUEN: 'ÑIGUEN',
    NOPE: 'ÑOPE',
    ACUNA: 'ACUÑA',
    YANEZ: 'YAÑEZ',
    IBANEZ: 'IBAÑEZ',
    DIANEZ: 'DIAÑEZ',
    BANALES: 'BAÑALES',
    BANOS: 'BAÑOS',
    BANUELOS: 'BAÑUELOS',
    BANUETA: 'BAÑUETA',
    BANULS: 'BAÑULS',
    BOLANO: 'BOLAÑO',
    CABANAS: 'CABAÑAS',
    CANABATE: 'CAÑABATE',
    CANAS: 'CAÑAS',
    DUENAS: 'DUEÑAS',
    GAZTANAGA: 'GAZTAÑAGA',
    GONI: 'GOÑI',
    INIGUEZ: 'IÑIGUEZ',
    LARRANAGA: 'LARRAÑAGA',
    LIANO: 'LIAÑO',
    MAGANA: 'MAGAÑA',
    MARINAS: 'MARIÑAS',
    MASCARENAS: 'MASCAREÑAS',
    MUNIZ: 'MUÑIZ',
    NINO: 'NIÑO',
    NORENA: 'NOREÑA',
    NORONA: 'NOROÑA',
    OCANA: 'OCAÑA',
    OMANA: 'OMAÑA',
    ONATE: 'OÑATE',
    ORDONEZ: 'ORDOÑEZ',
    ORDUNA: 'ORDUÑA',
    PENA: 'PEÑA',
    PENAFIEL: 'PEÑAFIEL',
    PENALOSA: 'PEÑALOSA',
    PENALVER: 'PEÑALVER',
    PENARANDA: 'PEÑARANDA',
    PENAS: 'PEÑAS',
    PENASCO: 'PEÑASCO',
    PINA: 'PIÑA',
    PINERO: 'PIÑERO',
    PINERA: 'PIÑERA',
    QUINONES: 'QUIÑONES',
    RIANO: 'RIAÑO',
    SALDANA: 'SALDAÑA',
    VALGANON: 'VALGAÑON',
    VEDRENA: 'VEDREÑA',
    VICUNA: 'VICUÑA',
    VILLASENOR: 'VILLASEÑOR',
    VINAS: 'VIÑAS',
    ZUNIGA: 'ZUÑIGA',
    PATINO: 'PATIÑO',
    PENUELAS: 'PEÑUELAS',
    LORONO: 'LOROÑO',
    ESPANA: 'ESPAÑA',
    CASTANEDA: 'CASTAÑEDA',
    TREVINO: 'TREVIÑO',
    MONTANO: 'MONTAÑO',
    MONTANEZ: 'MONTAÑEZ',
    INIGO: 'IÑIGO',
    INAKI: 'IÑAKI',
    INAQUI: 'IÑAQUI',
    BRISENO: 'BRISEÑO',
    ABENDANO: 'ABENDAÑO',
    BOLANOS: 'BOLAÑOS',
    PENATE: 'PEÑATE',
    PINEIRO: 'PIÑEIRO',
    QUINONEZ: 'QUIÑONEZ',
    TISCARENO: 'TISCAREÑO',
    GARDUNO: 'GARDUÑO',
    BURGUENO: 'BURGUEÑO',
    GAMINO: 'GAMIÑO',
    ESCARENO: 'ESCAREÑO',
    AVENDANO: 'AVENDAÑO',
    NUNO: 'NUÑO',
    UMANA: 'UMAÑA',
    ORDUNO: 'ORDUÑO',
    TEPDXTECO: 'TEPOXTECO',
    TEPDX: 'TEPOX',

    IPINA: 'IPIÑA',
    CARLQS: 'CARLOS',
    ACQSTA: 'ACOSTA',
    ZARENANA: 'ZAREÑANA'
  }

  let existe = 0
  var resultna = ''
  for (var clave in dicdatos) {
    if (dicdatos.hasOwnProperty(clave)) {
      if (clave === valornombre) {
        existe = 1
        resultna = dicdatos[clave]
      }
    }
  }
  if (existe === 1) {
    return resultna
  } else {
    return valornombre
  }
}

function fnSeparaNombres(NombreCompleto) {
  const names = []
  if (NombreCompleto === '' || NombreCompleto == null || NombreCompleto === 'Undefinied') {
    NombreCompleto = '?'
    names[0] = '?'
  } else {
    let esp = NombreCompleto.split(' ')
    let aux = ''
    let aux2 = ''

    for (let i = 0; i < esp.length; i++) {
      aux2 = esp[i]
      if (fnIdentificaConectoNombre(aux2)) {
        aux = aux + aux2 + ' '
      } else {
        aux = aux + aux2
        names.push(aux)
        aux = ''
      }
    }
  }
  return names
}

function fnIdentificaConectoNombre(palabra) {
  let esUnaPalabraConectora
  switch (palabra.toUpperCase()) {
    case 'EL':
    case 'LA':
    case 'LOS':
    case 'LAS':
    case 'DE':
    case 'Y':
    case 'D':
    case 'DEL':
    case 'VON':
    case 'IBN':
    case 'A':
    case 'EN':
    case 'SAN':
    case 'DON':
      esUnaPalabraConectora = true
      break
  }
  return esUnaPalabraConectora
}

function fnRemplazaNumerosPorLetras(palabra) {
  if (palabra === '' || palabra == null || palabra === 'Undefinied') {
    palabra = '?'
    return palabra
  } else {
    for (var i = 0; i <= palabra.length; i++) {
      palabra = palabra.replace('4', 'A')
      palabra = palabra.replace('0', 'O')
      palabra = palabra.replace('5', 'S')
      palabra = palabra.replace('1', 'I')
      palabra = palabra.replace('7', 'Z')
      palabra = palabra.replace('8', 'B')
    }
    return palabra
  }
}

function fnEliminaCaracteresEspeciales(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize()
}

function fnValidaNoVacios(cadena) {
  let ret
  if (cadena === '' || cadena == null || cadena === 'Undefinied') {
    ret = '?'
  } else {
    ret = cadena
  }
  return ret
}

function fnValidaCodigoPostal(direccion) {
  let resultado = '?'
  var_tamcadenapostal = direccion.length
  if (var_tamcadenapostal.length < 6) {
    return '?'
  }
  var_tipocadenapostal = 0
  resultado = ''
  let v1, v2, v3, v4, v5, v6
  v1 = direccion.substr(var_tamcadenapostal - 1, 1)
  v2 = direccion.substr(var_tamcadenapostal - 2, 1)
  v3 = direccion.substr(var_tamcadenapostal - 3, 1)
  v4 = direccion.substr(var_tamcadenapostal - 4, 1)
  v5 = direccion.substr(var_tamcadenapostal - 5, 1)
  v6 = direccion.substr(var_tamcadenapostal - 6, 1)

  if (!isNaN(v1)) {
    var_tipocadenapostal++
  }
  if (!isNaN(v2)) {
    var_tipocadenapostal++
  }
  if (!isNaN(v3)) {
    var_tipocadenapostal++
  }
  if (!isNaN(v4)) {
    var_tipocadenapostal++
  }
  if (!isNaN(v5)) {
    var_tipocadenapostal++
  }
  if (!isNaN(v6)) {
    var_tipocadenapostal++
  }
  switch (var_tipocadenapostal) {
    case 0:
      resultado = '?'
      break
    default:
      resultado = direccion.substr(
        var_tamcadenapostal - var_tipocadenapostal + 1,
        var_tipocadenapostal
      )
      break
  }
  return resultado
}

function parseaOcr(objetoData) {
  var direccioncompMB = objetoData.address.latin
  var saltosLinea = (direccioncompMB.match(/\n/g) || []).length
  let [call, col, delmun] = '?'
  switch (saltosLinea) {
    case 2:
      ;[call, col, delmun] = direccioncompMB.split('\n')
      break
    case 1:
      ;[col, delmun] = direccioncompMB.split('\n')
      break
    case 0:
      if (direccioncompMB == null || direccioncompMB == '' || direccioncompMB.length <= 9) {
        ;[call, col, delmun] = '?'
      }
      break
  }
  let calleMB = call
  let delegacionMB = delmun
  var comas = (delmun.match(',') || []).length
  let [dele, est] = '?'
  if (comas === 1) {
    ;[dele, est] = delmun.split(',')
    if (delmun.search(', ') > 0) {
      est = est.substr(1, est.length - 1)
    } else if (delmun.search(' ,') > 0) {
      dele = dele.substr(0, dele.length - 1)
    }
  } else {
    if (delmun.search(' ') > 0) {
      ;[dele, est] = delmun.split(' ')
    }
  }
  let municipioMB = dele
  let estadoMB = est
  let codigopostalMB = fnValidaCodigoPostal(col)
  let coloniaMB = fnValidaNoVacios(col.substr(0, var_tamcadenapostal - var_tipocadenapostal))
  let tipodoccineMB = fnValidaNoVacios(objetoData.classInfo.documentType)

  let claveelectorMB = fnValidaNoVacios(objetoData.frontViz.documentAdditionalNumber.latin)
  let cpk2 = fnValidaNoVacios(objetoData.frontViz.personalIdNumber.latin)
  let curpMB = '?'
  if (
    cpk2 === '' ||
    cpk2 === 'undefinied' ||
    cpk2 == null ||
    cpk2 === 'null' ||
    cpk2 === 'XXXXXXXXXXXXXXXXXX' ||
    cpk2 === 'xxxxxxxxxxxxxxxxxx'
  ) {
    curpMB = '?'
  } else {
    curpMB = objetoData.frontViz.personalIdNumber.latin
  }

  let estadoNacimientoMB = getEstRenapo(curpMB)
  if (
    estadoNacimientoMB === '' ||
    estadoNacimientoMB === 'undefined' ||
    estadoNacimientoMB == null
  ) {
    estadoNacimientoMB = '?'
  }
  let nombrecompletoMB = fnEliminaCaracteresEspeciales(
    fnRemplazaNumerosPorLetras(objetoData.frontViz.fullName.latin)
  )
  const nms = fnSeparaNombres(nombrecompletoMB)
  let nombre1MB = '?'
  let nombre2MB = '?'
  if (nms === '' || nms === '?' || nms === 'Undefinied' || nms == null) {
    nombre1MB = '?'
    nombre2MB = '?'
  } else {
    let tam = nms.length
    switch (tam) {
      case 0:
        break
      case 1:
        nombre1MB = fnValidaDiccionarioRemplazoNombre(nms[0])
        nombrecompletoMB = nombre1MB
        break
      case 2:
        nombre1MB = fnValidaDiccionarioRemplazoNombre(nms[0])
        nombre2MB = fnValidaDiccionarioRemplazoNombre(nms[1])
        nombrecompletoMB = nombre1MB + ' ' + nombre2MB
        break
    }
  }

  let apellidoMaternoMB = fnEliminaCaracteresEspeciales(
    fnValidaDiccionarioRemplazoNombre(fnRemplazaNumerosPorLetras(objetoData.mothersName.latin))
  )
  if (
    apellidoMaternoMB == '' ||
    apellidoMaternoMB == null ||
    apellidoMaternoMB == 'Undefinied' ||
    apellidoMaternoMB == 'NA-'
  ) {
    apellidoMaternoMB = '?'
  }
  let apellidoPaternoMB = fnEliminaCaracteresEspeciales(
    fnValidaDiccionarioRemplazoNombre(fnRemplazaNumerosPorLetras(objetoData.fathersName.latin))
  )
  if (
    apellidoPaternoMB == '' ||
    apellidoPaternoMB == null ||
    apellidoPaternoMB == 'Undefinied' ||
    apellidoPaternoMB == 'NA-'
  ) {
    apellidoPaternoMB = '?'
  }

  let sexoMB = fnValidaNoVacios(objetoData.sex.latin)

  faceImageEl.width = objetoData.fullDocumentFrontImage.rawImage.width
  faceImageEl.height = objetoData.fullDocumentFrontImage.rawImage.height
  const ctx2 = faceImageEl.getContext('2d')
  ctx2?.putImageData(objetoData.fullDocumentFrontImage.rawImage, 0, 0)
  var imagenFrontMB = faceImageEl.toDataURL('image/jpeg').slice(23)

  faceImageEl.width = objetoData.fullDocumentBackImage.rawImage.width
  faceImageEl.height = objetoData.fullDocumentBackImage.rawImage.height
  const ctx3 = faceImageEl.getContext('2d')
  ctx3?.putImageData(objetoData.fullDocumentBackImage.rawImage, 0, 0)
  var imagenBackMB = faceImageEl.toDataURL('image/jpeg').slice(23)

  faceImageEl.width = objetoData.faceImage.rawImage.width
  faceImageEl.height = objetoData.faceImage.rawImage.height
  const ctx = faceImageEl.getContext('2d')
  ctx?.putImageData(objetoData.faceImage.rawImage, 0, 0)
  var imagenfotoMB = faceImageEl.toDataURL('image/jpeg').slice(23)

  var fullImagenFront = ''
  if (objetoData.frontCameraFrame.frame) {
    faceImageEl.width = objetoData.frontCameraFrame.frame.width
    faceImageEl.height = objetoData.frontCameraFrame.frame.height
    const ctx4 = faceImageEl.getContext('2d')
    ctx4?.putImageData(objetoData.frontCameraFrame.frame, 0, 0)
    fullImagenFront = faceImageEl.toDataURL('image/jpeg').slice(23)
  }

  var fullImagenBack = ''
  if (objetoData.backCameraFrame.frame) {
    faceImageEl.width = objetoData.backCameraFrame.frame.width
    faceImageEl.height = objetoData.backCameraFrame.frame.height
    const ctx5 = faceImageEl.getContext('2d')
    ctx5?.putImageData(objetoData.backCameraFrame.frame, 0, 0)
    fullImagenBack = faceImageEl.toDataURL('image/jpeg').slice(23)
  }

  //faceImageEl.width = objetoData.signatureImage.encodedImage.width;
  //faceImageEl.height = objetoData.signatureImage.encodedImage.height;
  //const ctx4 = faceImageEl.getContext('2d');
  //ctx4?.putImageData(objetoData.signatureImage.encodedImage, 0, 0);
  //var imagenfirmaMB = faceImageEl.toDataURL('image/jpeg').slice(23);

  let annoregistroMB = fnValidaNoVacios(objetoData.frontViz.documentOptionalAdditionalNumber)
  let paisNombreMB = fnValidaNoVacios(objetoData.classInfo.countryName)
  let codigoiso2MB = fnValidaNoVacios(objetoData.classInfo.isoAlpha2CountryCode)
  let codigoiso3MB = fnValidaNoVacios(objetoData.classInfo.isoAlpha3CountryCode)
  let codigoisoNumMB = fnValidaNoVacios(objetoData.classInfo.isoNumericCountryCode)

  let diaEmisionMB = fnValidaConvierteDosDigitos(objetoData.dateOfIssue.day)
  let mesEmisionMB = fnValidaConvierteDosDigitos(objetoData.dateOfIssue.month)
  let annoEmisionMB = fnValidaNoVacios(objetoData.dateOfIssue.year)

  let fechacm = diaEmisionMB + '/' + mesEmisionMB + '/' + annoEmisionMB
  let fechaEmisionMB = fnValidaEstructuraFecha(fechacm)

  let validadateofbirthmrzMB = fnValidaNoVacios(objetoData.mrz.dateOfBirth.successfullyParsed)
  let validadatebirthdataMB = fnValidaNoVacios(objetoData.dateOfBirth.successfullyParsed)
  let fechanacecomMB = '?'
  let dianaceMB = '?'
  let mesnaceMB = '?'
  let annonaceMB = '?'
  if (validadatebirthdataMB === true) {
    fechanacecomMB = fnValidaEstructuraFecha(objetoData.dateOfBirth.originalString)
    dianaceMB = fnValidaConvierteDosDigitos(objetoData.dateOfBirth.day)
    mesnaceMB = fnValidaConvierteDosDigitos(objetoData.dateOfBirth.month)
    annonaceMB = fnValidaNoVacios(objetoData.dateOfBirth.year)

    let fechacm2 = dianaceMB + '/' + mesnaceMB + '/' + annonaceMB
    fechanacecomMB = fnValidaEstructuraFecha(fechacm2)
  } else if (validadateofbirthmrzMB === true) {
    dianaceMB = fnValidaConvierteDosDigitos(objetoData.mrz.dateOfBirth.day)
    mesnaceMB = fnValidaConvierteDosDigitos(objetoData.mrz.dateOfBirth.month)
    annonaceMB = fnValidaNoVacios(objetoData.mrz.dateOfBirth.year)

    let fechacm3 = dianaceMB + '/' + mesnaceMB + '/' + annonaceMB
    fechanacecomMB = fnValidaEstructuraFecha(fechacm3)
  }

  let validadateexpirydataMB = fnValidaNoVacios(objetoData.dateOfExpiry.successfullyParsed)
  let validadateexpirymrzMB = fnValidaNoVacios(objetoData.mrz.dateOfExpiry.successfullyParsed)
  let fechaExpiryMB = '?'
  let diaExpiryMB = '?'
  let mesExpiryMB = '?'
  let annoExpiryMB = '?'
  if (validadateexpirydataMB === true) {
    diaExpiryMB = fnValidaConvierteDosDigitos(objetoData.dateOfExpiry.day)
    mesExpiryMB = fnValidaConvierteDosDigitos(objetoData.dateOfExpiry.month)
    annoExpiryMB = fnValidaNoVacios(objetoData.dateOfExpiry.year)

    let fechacm4 = diaExpiryMB + '/' + mesExpiryMB + '/' + annoExpiryMB
    fechaExpiryMB = fnValidaEstructuraFecha(fechacm4)
  } else if (validadateexpirymrzMB === true) {
    diaExpiryMB = fnValidaConvierteDosDigitos(objetoData.mrz.dateOfExpiry.day)
    mesExpiryMB = fnValidaConvierteDosDigitos(objetoData.mrz.dateOfExpiry.month)
    annoExpiryMB = fnValidaNoVacios(objetoData.mrz.dateOfExpiry.year)

    let fechacm5 = diaExpiryMB + '/' + mesExpiryMB + '/' + annoExpiryMB
    fechaExpiryMB = fnValidaEstructuraFecha(fechacm5)
  }

  let numEmisionMB = fnObtieneDosDigitosEmision(annoregistroMB)
  annoregistroMB = fnValidaEstructuraCuatroDigitos(annoregistroMB)
  let folioMB = fnValidaNoVacios(objetoData.mrz.opt1)
  let seccionMB = fnObtieneCuatroDigitosSecc(folioMB)
  let cicMB = fnValidaNoVacios(objetoData.documentNumber.latin)
  let dianacemrzMB = '?'
  let mesnacemrzMB = '?'
  let annonacemrzMB = '?'
  let fechanacemrzMB = '?'

  dianacemrzMB = fnValidaNoVacios(objetoData.mrz.dateOfBirth.day)
  mesnacemrzMB = fnValidaNoVacios(objetoData.mrz.dateOfBirth.month)
  if ((dianacemrzMB >= 1) & (dianacemrzMB < 10)) {
    dianacemrzMB = '0' + dianacemrzMB
  }
  if ((mesnacemrzMB >= 1) & (mesnacemrzMB < 10)) {
    mesnacemrzMB = '0' + mesnacemrzMB
  }
  annonacemrzMB = fnValidaNoVacios(objetoData.mrz.dateOfBirth.year)
  fechanacemrzMB = dianacemrzMB + '/' + mesnacemrzMB + '/' + annonacemrzMB

  let numEmisionmrzMB = fnValidaEstructuraMrz(objetoData.mrz.opt2.replace(/[^0-9]+/g, ''))
  let nacionalidadmrzMB = fnValidaNacionalidadDiccionario(objetoData.mrz.nationality)

  let generomrzMB = fnValidaNoVacios(objetoData.mrz.gender)
  let codigodocmrzMB = fnValidaNoVacios(objetoData.mrz.documentCode)
  let rawMRZString = fnValidaNoVacios(objetoData.mrz.rawMRZString)

  //asignacion de datos

  jsonObject2.TipoDoc = 'Credencial IFE/INE'
  jsonObject2.Datos.ApellidoPaterno = fnValidaNoVacios(apellidoPaternoMB)
  jsonObject2.Datos.ApellidoMaterno = fnValidaNoVacios(apellidoMaternoMB)
  jsonObject2.Datos.Nombre = fnValidaNoVacios(nombrecompletoMB)
  jsonObject2.Datos.Nombre1 = fnValidaNoVacios(nombre1MB)
  jsonObject2.Datos.Nombre2 = fnValidaNoVacios(nombre2MB)
  jsonObject2.Datos.Calle = fnValidaNoVacios(calleMB)
  jsonObject2.Datos.Colonia = fnValidaNoVacios(coloniaMB)
  jsonObject2.Datos.CP = fnValidaNoVacios(codigopostalMB)
  jsonObject2.Datos.Delegacion = fnValidaNoVacios(delegacionMB)
  jsonObject2.Datos.Estado = fnValidaNoVacios(estadoMB)
  jsonObject2.Datos.Municipio = fnValidaNoVacios(municipioMB)
  jsonObject2.Datos.ClaveElector = fnValidaNoVacios(claveelectorMB)
  jsonObject2.Datos.Curp = fnValidaNoVacios(curpMB)
  jsonObject2.Datos.FechaNacimiento = fnValidaNoVacios(fechanacecomMB)
  jsonObject2.Datos.Sexo = fnValidaNoVacios(sexoMB)
  jsonObject2.Datos.EstadoNacimiento = fnValidaNoVacios(estadoNacimientoMB)
  jsonObject2.Datos.AnoRegistro = fnValidaNoVacios(annoregistroMB)
  jsonObject2.Datos.AnoEmision = fnValidaNoVacios(annoEmisionMB)
  jsonObject2.Datos.Vigencia = fnValidaNoVacios(annoExpiryMB)
  jsonObject2.Datos.NumeroEmision = fnValidaNoVacios(numEmisionMB)
  jsonObject2.Datos.Seccion = fnValidaNoVacios(seccionMB)
  jsonObject2.Datos.Localidad = fnValidaNoVacios(municipioMB)
  jsonObject2.Datos.Negocio = fnValidaNoVacios('ocr-cloud')

  jsonObject2.DatosMRZ.Folio = fnValidaNoVacios(folioMB).replace(/[^0-9]+/g, '')
  jsonObject2.DatosMRZ.CIC = fnValidaNoVacios(cicMB)
  jsonObject2.DatosMRZ.VigenciaMRZ = fnValidaNoVacios(fechaExpiryMB)
  jsonObject2.DatosMRZ.NumeroEmisionMRZ = fnValidaNoVacios(numEmisionmrzMB.replace(/[^0-9]+/g, ''))
  jsonObject2.DatosMRZ.NacionalidadMRZ = fnValidaNoVacios(nacionalidadmrzMB)

  jsonObject2.DatosMRZ.FechaNacimientoMrz = fnValidaNoVacios(fechanacemrzMB)
  jsonObject2.DatosMRZ.SexoMrz = fnValidaNoVacios(generomrzMB)
  jsonObject2.DatosMRZ.TipoIdentificacionReverso = fnValidaNoVacios(codigodocmrzMB)
  jsonObject2.DatosMRZ.rawMRZString = fnValidaNoVacios(rawMRZString)

  jsonObject2.ImagenesBase64.FrenteDoc = fnValidaNoVacios(imagenFrontMB)
  jsonObject2.ImagenesBase64.ReversoDoc = fnValidaNoVacios(imagenBackMB)
  jsonObject2.ImagenesBase64.FotografiaDoc = fnValidaNoVacios(imagenfotoMB)

  jsonObject2.ImagenesBase64.FullFrenteDoc = fnValidaNoVacios(fullImagenFront)
  jsonObject2.ImagenesBase64.FullReversoDoc = fnValidaNoVacios(fullImagenBack)

  return jsonObject2
}

export { parseaOcr }
