# Crear una vCard con los datos proporcionados
vcard_content = """BEGIN:VCARD
VERSION:3.0
FN:Enuar Dvd Lara Rjs
TITLE:Software Developer
ORG:Ocean Blue
TEL;TYPE=cell:+34612262241
EMAIL:enuar2110@gmail.com
ADR;TYPE=work:;;Av. de Mairena, 5;San Juan de Aznalfarache;Sevilla;41920;España
END:VCARD
"""

# Guardar el archivo .vcf
vcard_path = "/mnt/data/Enuar_Lara.vcf"
with open(vcard_path, "w") as vcf_file:
    vcf_file.write(vcard_content)

# Devolver la ruta del archivo para descarga
vcard_path