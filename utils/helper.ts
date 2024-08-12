type Row = Record<string, string>;
import { parse } from 'csv-parse';
const Helper = {
  getAvatarImage: (seed?: string) => {
    if (!seed) {
      seed = Date.now().toString();
    }
    return 'https://api.dicebear.com/5.x/micah/svg?seed=' + seed;
  },
  fileToBase64: (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  },
  csvToJson: async (file: File): Promise<Row[]> => {
    const parser = parse({
      columns: true,
      skip_empty_lines: true,
      delimiter: ','
    });
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csv: string = reader.result as string;
        parser.write(csv);
        parser.end();
      };
      parser.on('readable', function () {
        let record;
        const rows: Row[] = [];
        while ((record = parser.read())) {
          rows.push(record);
        }
        resolve(rows);
      });
      parser.on('error', function (err) {
        reject(err.message);
      });
    });
  },
  dataUriToBase64String(dataUri: string) {
    return dataUri.replace('data:', '').replace(/^.+,/, '');
  },
  downloadFile(data: string, filename: string) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
};

export default Helper;
