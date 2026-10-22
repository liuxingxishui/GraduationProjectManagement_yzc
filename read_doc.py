import struct

def extract_doc_text(filepath):
    with open(filepath, 'rb') as f:
        data = f.read()
    
    # Approach 1: Use FIB (File Information Block) offsets
    if len(data) >= 0x20:
        fc_min = struct.unpack('<I', data[0x18:0x1C])[0]
        ccp_text = struct.unpack('<I', data[0x1C:0x20])[0]
        
        if fc_min + ccp_text * 2 <= len(data) and ccp_text > 0 and ccp_text < 100000:
            text_data = data[fc_min:fc_min + ccp_text * 2]
            text = text_data.decode('utf-16le', errors='ignore')
            if len(text) > 100:
                return text
    
    # Approach 2: Search for regions with Chinese characters
    best_text = ""
    for start in range(0x200, min(len(data) - 1000, 0x10000), 0x100):
        chunk = data[start:start+2000]
        try:
            decoded = chunk.decode('utf-16le', errors='ignore')
            chinese_count = sum(1 for c in decoded if '\u4e00' <= c <= '\u9fff')
            if chinese_count > len(best_text) * 0.1 and len(decoded) > len(best_text):
                best_text = decoded
        except:
            pass
    
    return best_text

text = extract_doc_text('template.doc')

# Clean up the text
lines = text.split('\r')
clean_lines = []
for line in lines:
    clean = ''.join(c for c in line if c.isprintable() or c in '\n\t')
    if len(clean.strip()) > 0:
        clean_lines.append(clean.strip())

# Write to file to avoid console encoding issues
with open('template_extracted.txt', 'w', encoding='utf-8') as f:
    for i, line in enumerate(clean_lines):
        f.write(f"{i}: {line}\n")

print(f"Extracted {len(clean_lines)} lines to template_extracted.txt")
