export class Utils {
  public static camelCaseToNormal(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').trim();
  }

  public static trimString(text: string, count: number): string {
    if (!text) {
      return '';
    }

    return text.length > count ? `${text.substring(0, count)}...` : text;
  }

  public static getInitials(name: string, count: number): string {
    if (!name) {
      return '';
    }

    return name.split(' ').map(word => word[0]).join('').substring(0, count).toUpperCase();
  }
}