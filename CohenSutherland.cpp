#include <GL/glut.h>
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;


float xmin, ymin, xmax, ymax;


void myInit() {
    glClearColor(1.0,1.0,1.0,0.0);
    glColor3f(0.0f,0.0f,0.0f);
    glPointSize(10);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-100.0,100.0,-100.0,100.0);
}


void plotPointString(int x, int y, int pos)
{
    glRasterPos2f(x,y+pos);

    std::string string;
    
    string="("+std::to_string(int(round(x)))+","+std::to_string(int(round(y)))+")";

    char *s=const_cast<char*>(string.c_str());

    for (char* c = s; *c != '\0'; c++)
            glutBitmapCharacter(GLUT_BITMAP_HELVETICA_10 , *c);
}



void plotPoint(int x, int y)
{
    glBegin(GL_POINTS);
    glVertex2f(x,y);
    glEnd();
}


int bitRep(int x, int y)
{
    int RC = 0;

    if(x<xmin)
    {
        RC = RC | 1; // LEFT-BIT
    }
    if(x>xmax)
    {
        RC = RC | 2; // RIGHT-BIT
    }
    if(y<ymin)
    {
        RC = RC | 4; // BOTTOM-BIT
    }
    if(y>ymax)
    {
        RC = RC | 8; // TOP-BIT
    }

    return RC;
}


int accept(int RC1, int RC2)
{
    return (RC1 | RC2);
}


int reject(int RC1, int RC2)
{
    return (RC1 & RC2);
}


void CohenSutherland()
{
    glClear(GL_COLOR_BUFFER_BIT);
    
    plotPointString(0,0,0);

    glLineWidth(2);
    glPointSize(7);
    glBegin(GL_LINES);
    
    glVertex3f(-320.0f,0.0f,0.0f);
    glVertex3f(320.0f,0.0f,0.0f);

    glEnd();

    

    glLineWidth(2);

    glBegin(GL_LINES);

    glVertex3f(0.0f,-240.0f,0.0f);
    glVertex3f(0.0f,240.0f,0.0f);

    glEnd();

    
    cout << "xmin = ";
    cin >> xmin;
    cout << "ymin = ";
    cin >> ymin;
    cout << "\n";
    
    cout << "xmax = ";
    cin >> xmax;
    cout << "ymax = ";
    cin >> ymax;
    
    cout << "\n";

    plotPointString(xmin,ymin,0);
    plotPointString(xmax,ymin,0);
    plotPointString(xmax,ymax,0);
    plotPointString(xmin,ymax,0);


    glBegin(GL_LINES);

    glVertex3f(xmin,ymin,0.0f);
    glVertex3f(xmax,ymin,0.0f);

    glEnd();


    glBegin(GL_LINES);

    glVertex3f(xmax,ymin,0.0f);
    glVertex3f(xmax,ymax,0.0f);

    glEnd();


    glBegin(GL_LINES);

    glVertex3f(xmax,ymax,0.0f);
    glVertex3f(xmin,ymax,0.0f);

    glEnd();


    glBegin(GL_LINES);

    glVertex3f(xmin,ymax,0.0f);
    glVertex3f(xmin,ymin,0.0f);

    glEnd();



    float xa, ya, xb, yb;
    
    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;
    cout << "\n";
    
    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;
    
    cout << "\n";


    plotPointString(xa,ya,0);
    plotPointString(xb,yb,0);


    glColor3f(0,1,0);

    glBegin(GL_LINES);

    glVertex3f(xa,ya,0.0f);
    glVertex3f(xb,yb,0.0f);

    glEnd();
    
    int flag=0;

    int RC1, RC2;

    float m;

    while(1)
    {
        RC1 = bitRep(xa,ya);
        RC2 = bitRep(xb,yb);


        if(accept(RC1,RC2)==0)
        {
            flag=1;
            break;
        }
        if(reject(RC1,RC2)!=0)
        {
            break;
        }


        if(RC1==0)
        {
            int tempX, tempY;

            tempX = xa;
            tempY = ya;

            xa = xb;
            ya = yb;

            xb = tempX;
            yb = tempY;

            RC1 = bitRep(xa,ya);
            RC2 = bitRep(xb,yb);
        }


        if(xb!=xa)
        {
            m=(yb-ya)/(xb-xa);
        }

        if(RC1 & 1) // LEFT
        {
            ya = ya + ((xmin-xa)*m);
            xa = xmin;
        }

        else if(RC1 & 2) // RIGHT
        {
            ya = ya + ((xmax-xa)*m);
            xa = xmax;
        }

        else if(RC1 & 4) //BOTTOM
        {
            if(xb!=xa)
            {
                xa = xa + ((ymin-ya)/m);
                ya = ymin;
            }
        }

        else if(RC1 & 8) // TOP
        {
            if(xb!=xa)
            {
                xa = xa + ((ymax-ya)/m);
                ya = ymax;
            }
        }
    }

    if(flag==0)
    {
        cout << "LINE HASN'T CROSSED THE WINDOW\n\n";
    }
    else
    {
        glColor3f(0,0,0);

        plotPointString(xa,ya,0);
        plotPointString(xb,yb,0);

        glColor3f(1,0,0);

        glBegin(GL_LINES);

        glVertex3f(xa,ya,0.0f);
        glVertex3f(xb,yb,0.0f);

        glEnd();
    }


    glFlush();
}




int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Seventh Exercise");
    glutDisplayFunc(CohenSutherland);
    myInit();
    glutMainLoop();
    return 1;
}
